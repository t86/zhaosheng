import type { ShanghaiFocusRecord } from "@/lib/shanghai-focus";
import styles from "./ShanghaiOfficialRecordsTable.module.css";

type Props = {
  records: ShanghaiFocusRecord[];
};

function getGrainLabel(record: ShanghaiFocusRecord) {
  switch (record.grain) {
    case "school-line":
      return "学校线";
    case "exam-group":
      return "专业组线";
    default:
      return "分类线";
  }
}

function getSourceKindLabel(record: ShanghaiFocusRecord) {
  return record.sourceKind === "school-official" ? "学校官网" : "上海考试院";
}

export function ShanghaiOfficialRecordsTable({ records }: Props) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>年份</th>
            <th>官方口径</th>
            <th>分数</th>
            <th>来源</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={`${record.year}-${record.label}-${record.sourceLabel}-${record.score}`}>
              <td>{record.year}</td>
              <td>
                <strong>{record.label}</strong>
                <span className={styles.meta}>{getGrainLabel(record)}</span>
              </td>
              <td>
                <strong>{record.score}</strong>
                {record.note ? <span className={styles.meta}>{record.note}</span> : null}
              </td>
              <td>
                <a className={styles.link} href={record.sourceUrl} rel="noreferrer" target="_blank">
                  {getSourceKindLabel(record)}
                </a>
                <span className={styles.meta}>{record.sourceLabel}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
