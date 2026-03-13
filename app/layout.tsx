import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "985 高校志愿参考库",
  description: "面向高考志愿填报场景的 985 高校专题站，聚合学校标签、优势方向与公开报告快照。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
