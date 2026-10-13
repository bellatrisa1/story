import { useState, type RefObject } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BookOpen } from "lucide-react";
import { chapterTeaser } from "../data/chapterTeaser";
import styles from "../app/Book.module.scss";

export function ChapterTeaser({
  headingRef,
  onRestart,
}: {
  headingRef: RefObject<HTMLHeadingElement | null>;
  onRestart: () => void;
}) {
  const reduce = useReducedMotion();
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <article className={`${styles.birthday} ${styles.chapterTeaser}`}>
      <p className={styles.eyebrow}>{chapterTeaser.label}</p>
      <h2 ref={headingRef} tabIndex={-1}>
        {chapterTeaser.title}
      </h2>
      <div className={styles.rule} />
      <p className={styles.teaserDescription}>
        <em>{chapterTeaser.description}</em>
      </p>
      <motion.div
        className={styles.teaserArt}
        initial={reduce ? false : { opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.65 }}
      >
        {imageFailed ? (
          <div className={styles.flourish} aria-hidden="true">
            ❧
          </div>
        ) : (
          <img
            src={chapterTeaser.illustration}
            alt={chapterTeaser.illustrationAlt}
            width="600"
            height="600"
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        )}
      </motion.div>
      <p className={styles.teaserPromise}>
        <strong>{chapterTeaser.promise}</strong>
      </p>
      <button onClick={onRestart} className={styles.primary}>
        Läs igen <BookOpen size={17} />
      </button>
    </article>
  );
}
