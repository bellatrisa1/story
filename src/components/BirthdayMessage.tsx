import type { RefObject } from "react";
import { BookOpen } from "lucide-react";
import { birthday } from "../data/birthday";
import styles from "../app/Book.module.scss";
export function BirthdayMessage({
  headingRef,
  onRestart,
}: {
  headingRef: RefObject<HTMLHeadingElement | null>;
  onRestart: () => void;
}) {
  return (
    <article className={styles.birthday}>
      <p className={styles.eyebrow}>Till den ursprunglige gentlemannen</p>
      <div className={styles.flourish} aria-hidden="true">
        ❧
      </div>
      <h2 ref={headingRef} tabIndex={-1}>
        {birthday.greeting}
      </h2>
      {birthday.paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <p className={styles.signature}>{birthday.signature}</p>
      <small>{birthday.postscript}</small>
      <button onClick={onRestart} className={styles.primary}>
        Läs igen <BookOpen size={17} />
      </button>
    </article>
  );
}
