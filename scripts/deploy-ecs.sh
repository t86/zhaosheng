#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

HOST="${DEPLOY_HOST:-ecs-47}"
REMOTE_APP_DIR="${REMOTE_APP_DIR:-/opt/apps/zhaosheng}"
REMOTE_SERVICE="${REMOTE_SERVICE:-zhaosheng.service}"
REMOTE_NODE_BIN="${REMOTE_NODE_BIN:-/opt/node-v20.19.0-linux-x64/bin}"
ARCHIVE_PATH="${ARCHIVE_PATH:-/tmp/zhaosheng-deploy.tgz}"
REMOTE_ARCHIVE_PATH="${REMOTE_ARCHIVE_PATH:-/root/zhaosheng-deploy.tgz}"

echo "Deploying ${ROOT_DIR} -> ${HOST}:${REMOTE_APP_DIR}"

if ! command -v ssh >/dev/null 2>&1; then
  echo "ssh is required" >&2
  exit 1
fi

if ! command -v scp >/dev/null 2>&1; then
  echo "scp is required" >&2
  exit 1
fi

if ! command -v tar >/dev/null 2>&1; then
  echo "tar is required" >&2
  exit 1
fi

cd "${ROOT_DIR}"

PNPM_CMD="${PNPM_CMD:-corepack pnpm}"

echo "1/5 Lint"
${PNPM_CMD} lint

echo "2/5 Build"
${PNPM_CMD} build

echo "3/5 Pack"
COPYFILE_DISABLE=1 tar \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.DS_Store' \
  -czf "${ARCHIVE_PATH}" \
  -C "${ROOT_DIR}" \
  .

echo "4/5 Upload"
scp "${ARCHIVE_PATH}" "${HOST}:${REMOTE_ARCHIVE_PATH}"

echo "5/5 Install and restart"
ssh "${HOST}" "set -euo pipefail
mkdir -p '${REMOTE_APP_DIR}'
cd '${REMOTE_APP_DIR}'
rm -rf app components data lib public scripts .next
tar -xzf '${REMOTE_ARCHIVE_PATH}' -C '${REMOTE_APP_DIR}'
'${REMOTE_NODE_BIN}/corepack' pnpm install --frozen-lockfile
'${REMOTE_NODE_BIN}/corepack' pnpm build
systemctl restart '${REMOTE_SERVICE}'
systemctl is-active '${REMOTE_SERVICE}'
sleep 2
curl -I http://127.0.0.1/selection
"

echo "Deploy finished"
