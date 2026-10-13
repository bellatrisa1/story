import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BookOpen, X } from "lucide-react";
import { bookTitle } from "../data/story";
import { chapters, readingSections, totalSections } from "../data/book";
import { chapterTeaser } from "../data/chapterTeaser";
import { ChapterTeaser } from "./ChapterTeaser";
import { StoryPage } from "./StoryPage";
import { Certificate } from "./Certificate";
import { PersonalBirthdayMessage } from "./PersonalBirthdayMessage";
import { BirthdayMessage } from "./BirthdayMessage";
import { PageNavigation } from "./PageNavigation";
import styles from "../app/Book.module.scss";
export function BookReader({
  page,
  onGo,
}: {
  page: number;
  onGo: (page: number) => void;
}) {
  const [contents, setContents] = useState(false);
  const [readyPage, setReadyPage] = useState(-1);
  const transitioning = readyPage !== page;
  const reduce = useReducedMotion();
  const heading = useRef<HTMLHeadingElement>(null);
  const readerTop = useRef<HTMLDivElement>(null);
  const total = totalSections;
  const section = readingSections[page];
  const scene = section.kind === "scene" ? section.scene : undefined;
  const chapter = section.kind === "scene" ? section.chapter : chapters[0];
  function go(next: number) {
    onGo(next);
    setContents(false);
  }
  function focusHeading() {
    heading.current?.focus({ preventScroll: true });
    // На телефоне новый разворот начинается с иллюстрации, даже после прокрутки.
    if (window.matchMedia("(max-width: 700px)").matches)
      readerTop.current?.scrollIntoView({ block: "start", behavior: "auto" });
  }
  useEffect(() => {
    function keys(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setContents(false);
        return;
      }
      if (
        (e.target as HTMLElement).closest("button,input,select,textarea") ||
        contents ||
        transitioning
      )
        return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onGo(Math.min(total - 1, page + 1));
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onGo(Math.max(0, page - 1));
      }
    }
    window.addEventListener("keydown", keys);
    return () => window.removeEventListener("keydown", keys);
  }, [page, total, contents, onGo, transitioning]);
  return (
    <>
      <h1 className={styles.visuallyHidden}>{bookTitle}</h1>
      <div className={styles.readerTop} ref={readerTop}>
        <button
          onClick={() => setContents(!contents)}
          aria-expanded={contents}
          aria-controls="book-contents"
          disabled={transitioning}
        >
          <BookOpen size={17} />
          Innehåll
        </button>
        <span>
          {section.kind === "teaser"
            ? `${chapterTeaser.label} · ${chapterTeaser.title.toLocaleUpperCase("sv-SE")}`
            : `${chapter.label} · ${chapter.title.toLocaleUpperCase("sv-SE")}`}
        </span>
        <button onClick={() => go(-1)}>
          <X size={17} />
          <span>Stäng boken</span>
        </button>
      </div>
      {contents && (
        <nav
          id="book-contents"
          aria-label="Innehållsförteckning"
          className={styles.contents}
        >
          {readingSections.map((entry, i) => (
            <button
              key={entry.id}
              aria-current={page === i ? "page" : undefined}
              onClick={() => go(i)}
            >
              {entry.kind === "scene"
                ? `${chapters.length > 1 ? `${entry.chapter.label} · ` : ""}${String(i + 1).padStart(2, "0")} · ${entry.title}`
                : entry.title}
            </button>
          ))}
        </nav>
      )}
      <AnimatePresence mode="wait">
        <motion.section
          key={page}
          className={scene ? styles.spread : styles.endPage}
          initial={{ opacity: 0, rotateY: reduce ? 0 : -3 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          onAnimationComplete={(definition) => {
            // Завершение выхода старой страницы не должно прокручивать новую.
            if (
              typeof definition === "object" &&
              "opacity" in definition &&
              definition.opacity === 0
            )
              return;
            focusHeading();
            setReadyPage(page);
          }}
          aria-label={`Avsnitt ${page + 1} av ${total}`}
        >
          {scene ? (
            <StoryPage scene={scene} index={page} headingRef={heading} />
          ) : section.kind === "certificate" ? (
            <>
              <h2 ref={heading} tabIndex={-1} className={styles.visuallyHidden}>
                Det officiella intyget
              </h2>
              <Certificate />
            </>
          ) : section.kind === "birthday" ? (
            <BirthdayMessage headingRef={heading} onRestart={() => go(-1)} />
          ) : section.kind === "personal" ? (
            <PersonalBirthdayMessage
              headingRef={heading}
              onRestart={() => go(-1)}
            />
          ) : (
            <ChapterTeaser headingRef={heading} onRestart={() => go(-1)} />
          )}
        </motion.section>
      </AnimatePresence>
      <PageNavigation
        page={page}
        total={total}
        onGo={go}
        busy={transitioning}
      />
    </>
  );
}
