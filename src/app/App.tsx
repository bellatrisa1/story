import { useCallback, useState } from "react";
import { Leaf } from "lucide-react";
import { storyNote } from "../data/story";
import { totalSections } from "../data/book";
import { BookCover } from "../components/BookCover";
import { BookReader } from "../components/BookReader";
import styles from "./Book.module.scss";
export default function App() {
  const [page, setPage] = useState(-1);
  const go = useCallback((next: number) => {
    setPage(Math.max(-1, Math.min(totalSections - 1, next)));
    if (next < 0) window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  return (
    <div className={styles.app}>
      <a href="#main" className={styles.skip}>
        Hoppa till boken
      </a>
      <header className={styles.header}>
        <button
          className={styles.brand}
          onClick={() => go(-1)}
          aria-label="Tillbaka till bokens omslag"
        >
          <Leaf size={21} strokeWidth={1.3} />
          <span>ETT LITET LIV, ETT STORT ÄVENTYR</span>
        </button>
        <span className={styles.edition}>
          En födelsedagsutgåva <span>till Victor</span>
        </span>
      </header>
      <main id="main">
        {page < 0 ? (
          <BookCover onOpen={() => go(0)} />
        ) : (
          <BookReader page={page} onGo={go} />
        )}
      </main>
      <footer className={styles.footer}>
        <span>EN LITEN SANN HISTORIA, ÅTERBERÄTTAD MED KÄRLEK.</span>
        <span>
          {page < 0 ? "Skapad för Victor · Med tillgivenhet" : storyNote}
        </span>
        <Leaf size={16} strokeWidth={1} />
      </footer>
    </div>
  );
}
