import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "上海高考 985 报考参考 · 院校专业组、强基综评与时间线",
    template: "%s · 上海高考 985 报考参考",
  },
  description:
    "面向上海高三家长与学生的 985 高考报考参考站：上海近 5 年院校专业组线、强基与综评判断、高三下时间线、39 所 985 学校库与公开数据来源，按真实决策流重排。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
