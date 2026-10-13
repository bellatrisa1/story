import type { RefObject } from "react";
import type { StoryScene } from "../types/story";
import { Illustration } from "./Illustration";
import { InteractiveIllustration } from "./InteractiveIllustration";
import styles from "../app/Book.module.scss";
export function StoryPage({
  scene,
  index,
  headingRef,
}: {
  scene: StoryScene;
  index: number;
  headingRef: RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <>
      <div className={styles.picturePage}>
        <Illustration name={scene.illustration} alt={scene.alt} />
        <span className={styles.pictureCaption}>
          LILLE LASSE ÖRNS MÄRKVÄRDIGA ÄVENTYR
        </span>
        <span className={styles.pageNumber}>{index * 2 + 2}</span>
      </div>
      <article className={styles.textPage}>
        <p className={styles.eyebrow}>{scene.eyebrow}</p>
        <h2 ref={headingRef} tabIndex={-1}>
          {scene.title}
        </h2>
        <div className={styles.rule} />
        <div className={styles.prose}>
          {scene.paragraphs.map((p, i) => (
            <p key={p} className={i === 0 ? styles.firstParagraph : undefined}>
              {p}
            </p>
          ))}
        </div>
        {scene.interaction && (
          <InteractiveIllustration interaction={scene.interaction} />
        )}
        <span className={styles.pageNumber}>{index * 2 + 3}</span>
      </article>
    </>
  );
}
