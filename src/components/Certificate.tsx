import { certificate } from "../data/certificate";
import { useState } from "react";
import { Download, Printer, Award } from "lucide-react";
import { downloadCertificate } from "../utils/certificate";
import styles from "../app/Book.module.scss";
export function Certificate() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function download() {
    setBusy(true);
    setError("");
    try {
      await downloadCertificate();
    } catch {
      setError(
        "Det gick inte att ladda ner intyget. Försök igen eller välj Skriv ut.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className={styles.certificateWrap}>
      <div className={styles.certificate}>
        <img
          src="/illustrations/ornament.webp"
          alt=""
          className={styles.ornament}
        />
        <p className={styles.eyebrow}>{certificate.kingdom}</p>
        <h2>{certificate.title}</h2>
        <div className={styles.rule} />
        <h3>{certificate.name}</h3>
        <p>{certificate.description}</p>
        <Award size={42} strokeWidth={1} />
        <p className={styles.approval}>{certificate.approval}</p>
        <em>
          <strong>{certificate.motherLabel}</strong> {certificate.mother}
        </em>
        <small>{certificate.note}</small>
      </div>
      <div className={styles.actions}>
        <button onClick={download} disabled={busy}>
          <Download size={17} />
          {busy ? "Förbereder PDF…" : "Ladda ner intyget"}
        </button>
        <button onClick={() => window.print()}>
          <Printer size={17} />
          Skriv ut
        </button>
      </div>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
