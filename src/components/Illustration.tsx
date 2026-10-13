import { useState } from "react";
import styles from "../app/Book.module.scss";
export function Illustration({
  name,
  alt,
  eager = false,
}: {
  name: string;
  alt: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className={styles.imageFallback} role="img" aria-label={alt}>
      <span>Illustrationen kunde inte visas.</span>
      <p>{alt}</p>
    </div>
  ) : (
    <img
      className={styles.illustration}
      src={`/illustrations/${name}.webp`}
      alt={alt}
      width="1024"
      height="1536"
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      onError={() => setFailed(true)}
    />
  );
}
