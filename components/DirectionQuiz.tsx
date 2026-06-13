"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  computeDirectionShortlist,
  directionQuizDisclaimer,
  directionQuizQuestions,
  type DirectionQuizAnswers,
} from "@/data/direction-quiz";
import type { HotDirectionView } from "@/lib/hot-directions";
import styles from "./DirectionQuiz.module.css";

type DirectionQuizProps = {
  directions: HotDirectionView[];
};

export default function DirectionQuiz({ directions }: DirectionQuizProps) {
  const [answers, setAnswers] = useState<DirectionQuizAnswers>({});

  const directionMap = useMemo(() => {
    const map = new Map<string, HotDirectionView>();
    directions.forEach((direction) => map.set(direction.slug, direction));
    return map;
  }, [directions]);

  const result = useMemo(() => computeDirectionShortlist(answers), [answers]);

  const allAnswered = result.answeredCount === result.totalQuestions;

  const matchedDirections = allAnswered
    ? result.slugs
        .map((slug) => directionMap.get(slug))
        .filter((item): item is HotDirectionView => Boolean(item))
    : [];

  function selectOption(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function reset() {
    setAnswers({});
  }

  return (
    <div className={styles.quiz}>
      <div className={styles.declare}>
        <span className={styles.declareTag}>先做这一步</span>
        <p>{directionQuizDisclaimer}</p>
      </div>

      <div className={styles.progress}>
        <span>
          已回答 {result.answeredCount} / {result.totalQuestions} 题
        </span>
        {result.answeredCount > 0 ? (
          <button className={styles.resetBtn} onClick={reset} type="button">
            重新测一次
          </button>
        ) : null}
      </div>

      <ol className={styles.questionList}>
        {directionQuizQuestions.map((question, index) => {
          const current = answers[question.id];
          return (
            <li className={styles.questionItem} key={question.id}>
              <div className={styles.questionHead}>
                <span className={styles.questionNo}>{index + 1}</span>
                <div>
                  <p className={styles.questionPrompt}>{question.prompt}</p>
                  {question.helper ? (
                    <p className={styles.questionHelper}>{question.helper}</p>
                  ) : null}
                </div>
              </div>

              <div className={styles.optionRow}>
                {question.options.map((option) => {
                  const active = current === option.value;
                  return (
                    <button
                      aria-pressed={active}
                      className={
                        active
                          ? `${styles.optionBtn} ${styles.optionBtnActive}`
                          : styles.optionBtn
                      }
                      key={option.value}
                      onClick={() => selectOption(question.id, option.value)}
                      type="button"
                    >
                      <span className={styles.optionLabel}>{option.label}</span>
                      {option.hint ? (
                        <span className={styles.optionHint}>{option.hint}</span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ol>

      <div className={styles.resultBlock}>
        {allAnswered ? (
          <>
            <div className={styles.resultHead}>
              <strong>这几个方向值得你接着往下看</strong>
              <p>
                下面是结合你的选择缩小出来的 {matchedDirections.length} 个方向，
                按贴合度排序。点开任意一个回到主榜对应卡片看完整说明和候选校。
              </p>
            </div>

            <div className={styles.resultGrid}>
              {matchedDirections.map((direction) => {
                const topSchools = direction.candidatePrograms
                  .slice(0, 3)
                  .map((candidate) => candidate.school.name);

                return (
                  <article className={styles.resultCard} key={direction.slug}>
                    <h3 className={styles.resultName}>{direction.name}</h3>
                    <p className={styles.resultOneLiner}>{direction.oneLiner}</p>

                    {topSchools.length > 0 ? (
                      <div className={styles.resultSchools}>
                        <small>候选校举例</small>
                        <div className={styles.resultSchoolRow}>
                          {topSchools.map((schoolName) => (
                            <span
                              className={styles.resultSchoolPill}
                              key={`${direction.slug}-${schoolName}`}
                            >
                              {schoolName}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <a
                      className={styles.resultLink}
                      href={`/directions#${direction.slug}`}
                    >
                      展开看这个方向 →
                    </a>
                  </article>
                );
              })}
            </div>

            <p className={styles.resultFoot}>
              短名单只是起点，别让它替你做决定。建议挑出最想看的 1-2 个方向，
              <Link href="/schools">去学校库按方向筛选</Link>，再回到上海组线核对选科和计划数。
            </p>
          </>
        ) : (
          <p className={styles.resultHint}>
            把上面 {result.totalQuestions} 题都选完，就会在这里给出 3-5 个值得继续看的方向。
          </p>
        )}
      </div>
    </div>
  );
}
