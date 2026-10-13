import type { ReadingSection, StoryChapter } from "../types/story";
import { scenes } from "./story";
import { chapterTeaser } from "./chapterTeaser";

// Новые завершённые главы добавляются сюда с готовыми сценами.
// Анонс не регистрируется как доступная глава с пустым содержимым.
export const chapters: StoryChapter[] = [
  {
    id: "chapter-one",
    label: "KAPITEL I",
    title: "Det märkliga fallet med det felaktiga namnet",
    scenes,
  },
];
export const readingSections: ReadingSection[] = [
  ...chapters.flatMap((chapter) =>
    chapter.scenes.map((scene) => ({
      id: `${chapter.id}-${scene.id}`,
      kind: "scene" as const,
      title: scene.title,
      scene,
      chapter,
    })),
  ),
  {
    id: "certificate",
    kind: "certificate",
    title: "Identitetsintyg",
    navigationLabel: "Intyget",
  },
  { id: "birthday", kind: "birthday", title: "Till Victor" },
  { id: "personal", kind: "personal", title: "En personlig hälsning" },
  {
    id: "chapter-two-teaser",
    kind: "teaser",
    navigationLabel: chapterTeaser.promise,
    title: `${chapterTeaser.label} · ${chapterTeaser.title}`,
  },
];
export const totalSections = readingSections.length;
