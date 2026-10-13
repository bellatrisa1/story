import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Illustration } from "./Illustration";
import styles from "../app/Book.module.scss";
export function BookCover({ onOpen }: { onOpen: () => void }) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);
  function openBook() {
    if (reduce) onOpen();
    else setOpening(true);
  }
  return (
    <motion.section
      className={styles.cover}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.coverCopy}>
        <p className={styles.eyebrow}>
          <span /> EN BERÄTTELSE ATT BEVARA <span />
        </p>
        <h1>
          Lille Lasse Örns
          <br />
          <em>märkvärdiga äventyr</em>
        </h1>
        <p className={styles.subtitle}>
          Det märkliga fallet med det felaktiga namnet
        </p>
        <div className={styles.flourish} aria-hidden="true">
          ❧
        </div>
        <p className={styles.inscription}>
          Bygger på en nästan otrolig men sann historia.
        </p>
        <button
          className={styles.primary}
          onClick={openBook}
          disabled={opening}
        >
          {opening ? "Öppnar…" : "Öppna boken"} <ArrowRight size={18} />
        </button>
        <p className={styles.coverNote}>
          En liten pojke. Ett ståtligt namn. Ett alldeles förträffligt
          missförstånd.
        </p>
      </div>
      <motion.div
        className={styles.coverArt}
        initial={false}
        animate={
          opening
            ? { rotateY: -65, rotate: 0, opacity: 0, x: -25 }
            : { rotateY: 0, rotate: 2, opacity: 1, x: 0 }
        }
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => {
          if (opening) onOpen();
        }}
      >
        <div className={styles.bookSpine} />
        <Illustration
          name="cover"
          alt="Lille Victor med sin rödvita keps och blå hängselbyxor i en svensk trädgård, målad i akvarell."
          eager
        />
        <div className={styles.artCaption}>
          BARNDOMSKRÖNIKAN <span>VOLYM I</span>
        </div>
      </motion.div>
    </motion.section>
  );
}
