"use client";

import { useEffect, useId, useState } from "react";
import type { CutoffTable, CutoffTableRow } from "@/data/selection-guides";
import styles from "./page.module.css";

export function ZongpingCutoffTable({ table }: { table: CutoffTable }) {
  const [selectedRow, setSelectedRow] = useState<CutoffTableRow | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!selectedRow) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedRow(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedRow]);

  return (
    <>
      <div className={styles.tableShell}>
        <table className={styles.cutoffTable}>
          <thead>
            <tr>
              {table.columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={`${row.school}-${row.group}`}>
                {table.columns.map((column) => (
                  <td key={`${row.school}-${row.group}-${column.key}`}>
                    {column.key === "group" ? (
                      <button
                        aria-label={`查看${row.group}具体专业`}
                        className={styles.groupDetailButton}
                        onClick={() => setSelectedRow(row)}
                        type="button"
                      >
                        <span>{row.group}</span>
                        <small>看专业</small>
                      </button>
                    ) : (
                      row[column.key] || "-"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRow ? (
        <div className={styles.dialogBackdrop} onClick={() => setSelectedRow(null)}>
          <section
            aria-describedby={descriptionId}
            aria-labelledby={titleId}
            aria-modal="true"
            className={styles.groupDialog}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className={styles.dialogHeader}>
              <div>
                <span>{selectedRow.school}</span>
                <h3 id={titleId}>{selectedRow.group}</h3>
              </div>
              <button
                aria-label="关闭专业组详情"
                className={styles.dialogCloseButton}
                onClick={() => setSelectedRow(null)}
                type="button"
              >
                ×
              </button>
            </div>

            <p className={styles.dialogDescription} id={descriptionId}>
              {selectedRow.detailNote}
            </p>

            <dl className={styles.dialogMetaGrid}>
              <div>
                <dt>选科</dt>
                <dd>{selectedRow.subject}</dd>
              </div>
              <div>
                <dt>计划数</dt>
                <dd>{selectedRow.plan}</dd>
              </div>
              <div>
                <dt>入围线</dt>
                <dd>{selectedRow.cutoff}</dd>
              </div>
              <div>
                <dt>全市位次</dt>
                <dd>{selectedRow.rank}</dd>
              </div>
              <div>
                <dt>来源口径</dt>
                <dd>{selectedRow.source}</dd>
              </div>
              <div>
                <dt>专业口径</dt>
                <dd>{selectedRow.majorSource}</dd>
              </div>
            </dl>

            <div className={styles.majorListBlock}>
              <strong>代表专业 / 方向</strong>
              <ul>
                {selectedRow.majors.map((major) => (
                  <li key={`${selectedRow.group}-${major}`}>{major}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
