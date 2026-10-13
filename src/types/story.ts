export interface StoryInteraction {
  kind: "notice" | "paint" | "music" | "choice";
  label: string;
  response: string;
  formattedResponse?: { label: string; text: string }[];
  choices?: { label: string; response: string }[];
}
export interface StoryScene {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  illustration: string;
  alt: string;
  interaction?: StoryInteraction;
}

export interface StoryChapter {
  id: string;
  label: string;
  title: string;
  scenes: StoryScene[];
}

export type ReadingSection =
  | {
      id: string;
      kind: "scene";
      title: string;
      scene: StoryScene;
      chapter: StoryChapter;
    }
  | {
      id: string;
      kind: "certificate" | "birthday" | "personal" | "teaser";
      navigationLabel?: string;
      title: string;
    };
