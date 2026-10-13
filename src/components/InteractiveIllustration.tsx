import { useState } from "react";
import { Music2, Paintbrush, FileText, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { StoryInteraction } from "../types/story";
import styles from "../app/Book.module.scss";
export function InteractiveIllustration({
  interaction,
}: {
  interaction: StoryInteraction;
}) {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const Icon = {
    music: Music2,
    paint: Paintbrush,
    notice: FileText,
    choice: MessageCircle,
  }[interaction.kind];
  return (
    <div className={styles.discovery}>
      <button aria-expanded={open} onClick={() => setOpen(!open)}>
        <Icon size={17} />
        {interaction.label}
        <span>+</span>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.reveal}
        >
          {interaction.choices && (
            <div className={styles.choiceButtons}>
              {interaction.choices.map((choice) => (
                <button
                  key={choice.label}
                  aria-pressed={answer === choice.response}
                  onClick={() => setAnswer(choice.response)}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          )}
          {answer && <p role="status">{answer}</p>}
          {interaction.formattedResponse ? (
            interaction.formattedResponse.map((line) => (
              <p key={line.label}>
                <strong>{line.label}</strong> {line.text}
              </p>
            ))
          ) : (
            <p>{interaction.response}</p>
          )}
          {interaction.kind === "music" && (
            <span aria-hidden="true" className={styles.notes}>
              ♪ ♫ ♪
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
}
