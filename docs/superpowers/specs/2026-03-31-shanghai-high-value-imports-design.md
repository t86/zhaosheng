# Shanghai High-Value Imports Design

## Goal
为上海高价值录取数据补一层“后续可导入”的稳定骨架，先把文件入口、字段规则和校验方式固定下来，再导入真实数据。

## Scope
- 为 `平均分位次 / 各专业录取人数 / 在沪计划数` 提供统一导入入口。
- 当前只承接空数据和校验规则，不伪造任何业务数据。
- 页面只展示“待导入”状态和官方来源，不展示未核实的数值。

## Chosen Approach
采用“JSON 数据槽 + TS 字段清单 + 校验脚本”的方案：
- `data/shanghai/high-value/*.json` 作为后续手工或脚本导入的落点。
- `lib/shanghai-high-value-imports.ts` 维护两份官方资料的字段清单、文件路径和校验状态。
- `scripts/validate-shanghai-high-value-imports.mts` 作为导入后的统一校验入口。

## Alternatives Considered
- 直接把未来数据写死在 `.ts` 文件里：实现快，但后续从 Excel/目录表导入时会频繁改代码，不利于人工校对。
- 现在就做 PDF/OCR 抽取：风险高，容易把未核实字段带上站，不符合当前“真实性优先”的要求。

## Data Boundaries
- `major-admissions.json` 只承接《2024 年上海市普通高等学校招生各专业录取人数及考分》。
- `major-plans.json` 只承接《2025 年上海市普通高等学校招生专业目录》。
- 页面继续保留“待导入”提示，直到仓库里有真实记录且通过校验。

## Verification
- 节点测试覆盖字段清单和待导入状态。
- 运行专用校验脚本，确保导入后能发现缺字段问题。
- 再跑 `pnpm lint` 与 `pnpm build`。
