import { ArrowLeft, ArrowRight } from "lucide-react";
import { readingSections } from "../data/book";
import styles from "../app/Book.module.scss";
export function PageNavigation({
  page,
  total,
  onGo,
  busy = false,
}: {
  page: number;
  total: number;
  onGo: (page: number) => void;
  busy?: boolean;
}) {
  const next = readingSections[page + 1];
  return (
    <nav className={styles.navigation} aria-label="Sidnavigering">
      <button onClick={() => onGo(page - 1)} disabled={busy}>
        <ArrowLeft size={18} />
        {page === 0 ? "Omslag" : "Föregående"}
      </button>
      <div>
        <span aria-live="polite">
          {String(page + 1).padStart(2, "0")}{" "}
          <i>/ {String(total).padStart(2, "0")}</i>
        </span>
        <div className={styles.progress}>
          <div style={{ width: `${((page + 1) / total) * 100}%` }} />
        </div>
      </div>
      <button
        onClick={() => onGo(page + 1)}
        disabled={busy || page === total - 1}
      >
        {!next || next.kind === "scene"
          ? "Nästa sida"
          : (next.navigationLabel ?? next.title)}
        <ArrowRight size={18} />
      </button>
    </nav>
  );
}
