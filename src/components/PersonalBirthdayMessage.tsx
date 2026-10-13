import type { RefObject } from "react";
import { BookOpen } from "lucide-react";
import { personalBirthday } from "../data/personalBirthday";
import styles from "../app/Book.module.scss";
export function PersonalBirthdayMessage({
  headingRef,
  onRestart,
}: {
  headingRef: RefObject<HTMLHeadingElement | null>;
  onRestart: () => void;
}) {
  return (
    <article className={`${styles.birthday} ${styles.personalLetter}`}>
      <p className={styles.eyebrow}>En personlig hälsning</p>
      <div className={styles.flourish} aria-hidden="true">
        ❧
      </div>
      <h2 ref={headingRef} tabIndex={-1}>
        {personalBirthday.greeting}
      </h2>
      <div className={styles.letterBody}>
        {personalBirthday.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p>
        <strong>{personalBirthday.closing}</strong>
      </p>
      <p className={styles.signature}>
        {personalBirthday.signoff}
        <br />
        <em>{personalBirthday.signature}</em>
      </p>
      <small>
        <strong>P.S.</strong> {personalBirthday.postscript}
      </small>
      <button onClick={onRestart} className={styles.primary}>
        Läs igen <BookOpen size={17} />
      </button>
    </article>
  );
}
