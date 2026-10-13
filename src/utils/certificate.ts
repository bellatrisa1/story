import { certificate } from "../data/certificate";
export async function downloadCertificate() {
  // Библиотека PDF загружается только по запросу читателя.
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  pdf.setFillColor(249, 246, 235);
  pdf.rect(0, 0, 297, 210, "F");
  // Декоративный рисунок сохраняется в PDF; текст остаётся выделяемым.
  const image = new Image();
  image.src = "/illustrations/ornament.webp";
  try {
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 800;
    const context = canvas.getContext("2d");
    if (context) {
      context.fillStyle = "#f9f6eb";
      context.fillRect(0, 0, 1200, 800);
      context.globalAlpha = 0.13;
      context.drawImage(image, 0, 0, 1200, 800);
      pdf.addImage(
        canvas.toDataURL("image/jpeg", 0.85),
        "JPEG",
        15,
        15,
        267,
        180,
      );
    }
  } catch {
    /* При недоступном орнаменте сохраняется рамка и весь текст. */
  }
  pdf.setDrawColor(143, 123, 78);
  pdf.setLineWidth(0.6);
  pdf.rect(12, 12, 273, 186);
  pdf.setLineWidth(0.2);
  pdf.rect(15, 15, 267, 180);
  pdf.setTextColor(48, 68, 53);
  pdf.setFont("times", "normal");
  pdf.setFontSize(13);
  pdf.text(certificate.kingdom, 148.5, 42, { align: "center" });
  pdf.setFontSize(34);
  pdf.text(certificate.title, 148.5, 65, { align: "center" });
  pdf.setFontSize(42);
  pdf.text(certificate.name, 148.5, 98, { align: "center" });
  pdf.setFontSize(15);
  pdf.text(pdf.splitTextToSize(certificate.description, 215), 148.5, 119, {
    align: "center",
    lineHeightFactor: 1.6,
  });
  pdf.setFontSize(13);
  pdf.text(certificate.approval, 148.5, 158, {
    align: "center",
  });
  pdf.setFont("times", "italic");
  pdf.text(`${certificate.motherLabel} ${certificate.mother}`, 148.5, 172, {
    align: "center",
  });
  pdf.setFontSize(9);
  pdf.text(certificate.note, 148.5, 188, {
    align: "center",
  });
  pdf.save("Lasse-Orn-Identitetsintyg.pdf");
}
