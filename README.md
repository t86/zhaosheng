# 985 高校志愿参考库

一个只聚焦 `39` 所 `985` 高校的学校层参考站点，面向高考志愿填报前的学校池筛选。

当前版本重点提供：

- `985` 学校主表：城市、区域、办学属性、优势方向、专题标签
- 专题页：`C9`、`华东五校`、`国防七子中的 985`、`师范 985`、`医学实力强` 等
- 学校详情页：学校概况、优势方向、公开报告快照、官方入口
- 数据方法页：说明当前数据覆盖情况和下一轮最该补的字段

## 启动

```bash
pnpm install
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 主要命令

```bash
pnpm dev
pnpm lint
pnpm build
pnpm collect:data
pnpm deploy:ecs
```

`pnpm collect:data` 会运行 `scripts/enrich_school_metrics.py`，尝试从公开网页中补充：

- 本科教学质量报告
- 毕业生就业质量报告
- 本科专业数
- 毕业去向落实率
- 本科深造率
- 薪资快照

注意：学校公开报告分散在不同官网和信息公开页，且搜索引擎会对批量抓取限流，所以当前脚本更适合作为“持续补数工具”，不是一次性跑满 39 校的全自动采集器。

## 部署

当前线上服务器使用 `systemd` 托管，默认目标是 SSH 配置里的 `ecs-47`，服务名 `zhaosheng.service`，线上目录 `/opt/apps/zhaosheng`。

```bash
pnpm deploy:ecs
```

这个脚本会依次执行：

1. 本地 `pnpm lint`
2. 本地 `pnpm build`
3. 打包当前工作区源码并上传服务器
4. 服务器执行 `pnpm install --frozen-lockfile` 和 `pnpm build`
5. 重启 `zhaosheng.service` 并用 `curl http://127.0.0.1/selection` 验活

如需改目标机或服务参数，可通过环境变量覆盖：

```bash
DEPLOY_HOST=ecs-47 \
REMOTE_APP_DIR=/opt/apps/zhaosheng \
REMOTE_SERVICE=zhaosheng.service \
REMOTE_NODE_BIN=/opt/node-v20.19.0-linux-x64/bin \
pnpm deploy:ecs
```

## 数据结构

- [`data/school-seed.json`](/Volumes/WORK/codex-guide/life/data/school-seed.json)：39 所学校的稳定主表
- [`data/school-metrics.json`](/Volumes/WORK/codex-guide/life/data/school-metrics.json)：已挂接上的公开报告快照
- [`data/topics.ts`](/Volumes/WORK/codex-guide/life/data/topics.ts)：专题定义
- [`lib/schools.ts`](/Volumes/WORK/codex-guide/life/lib/schools.ts)：前端聚合层

## 当前边界

- 只做学校层，不做分省录取位次推荐
- 只看 `985`，不混入 `211 / 双一流 / 行业强校`
- 就业和薪资字段只展示已挂接公开来源的学校，不补猜测值

## 下一轮建议

1. 接入分省份历年录取位次
2. 接入专业组选科要求
3. 扩充更多学校的官方就业报告快照
