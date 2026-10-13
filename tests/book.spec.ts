import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
// Проверяем путь читателя, PDF и адаптивные границы.
test("complete story, discoveries, PDF and birthday", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "sv");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Lasse Örn",
  );
  await page.getByRole("button", { name: "Öppna boken" }).click();
  await expect(
    page.getByRole("heading", { name: "En pojke med bestämda åsikter" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Nästa sida" }).click();
  await page.getByRole("button", { name: "Läs det lilla anslaget" }).click();
  await expect(page.getByText(/Alla viktiga meddelanden/)).toBeVisible();
  await page.getByRole("button", { name: "Nästa sida" }).click();
  await page
    .getByRole("button", { name: "Ska han rätta till misstaget?" })
    .click();
  await expect(page.getByText(/Kommittén tackar/)).toBeVisible();
  await page.getByRole("button", { name: "Innehåll", exact: true }).click();
  await page.getByRole("button", { name: /Den ursprunglige herr/ }).click();
  await page.getByRole("button", { name: "Undersök färghinken" }).click();
  await expect(page.getByText(/Diskret självsäker salviagrön/)).toBeVisible();
  await page.getByRole("button", { name: "Innehåll", exact: true }).click();
  await page.getByRole("button", { name: /Och så var det sången/ }).click();
  await page.getByRole("button", { name: "Låt en visa flyga iväg" }).click();
  await expect(page.getByText(/En liten visa till havet/)).toBeVisible();
  await page.getByRole("button", { name: "Innehåll", exact: true }).click();
  await page
    .getByRole("button", { name: "Identitetsintyg", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Identitetsintyg", exact: true }),
  ).toBeVisible();
  const downloaded = page.waitForEvent("download");
  await page.getByRole("button", { name: "Ladda ner intyget" }).click();
  const file = await downloaded;
  expect(file.suggestedFilename()).toBe("Lasse-Orn-Identitetsintyg.pdf");
  const path = await file.path();
  expect(path).toBeTruthy();
  const bytes = await readFile(path!);
  expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
  expect(bytes.length).toBeGreaterThan(3000);
  await page.getByRole("button", { name: "Till Victor", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Grattis på födelsedagen, Victor!" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "En personlig hälsning", exact: true })
    .click();
  await expect(
    page.getByText("Din favoritbiograf på amatörnivå."),
  ).toBeVisible();
  await expect(
    page.getByText("Grattis på födelsedagen, min käre Victor."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Föregående", exact: true }).click();
  await expect(
    page.getByText("Du meddelade bara förskolan.", { exact: false }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "En personlig hälsning", exact: true })
    .click();
  await expect(page.getByText("12 / 13")).toBeVisible();
  await page
    .getByRole("button", { name: "Fortsättning följer", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Äventyret fortsätter…", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("13 / 13")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Nästa sida", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Läs igen" }).click();
  await expect(page.getByRole("button", { name: "Öppna boken" })).toBeVisible();
  expect(errors).toEqual([]);
});
test("keyboard, reduced motion and responsive boundaries", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Öppna boken" }).click();
  await expect(
    page.getByRole("heading", { name: "En pojke med bestämda åsikter" }),
  ).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("heading", { name: "Viktiga ärenden på förskolan" }),
  ).toBeVisible();
  await page.keyboard.press("ArrowLeft");
  await expect(
    page.getByRole("heading", { name: "En pojke med bestämda åsikter" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Innehåll", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("navigation", { name: "Innehållsförteckning" }),
  ).toHaveCount(0);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow, `overflow at ${width}px`).toBe(false);
  }
});

test("all illustrations load and the book passes automated accessibility checks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("img").first()).toBeVisible();
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  async function checkAccessibility() {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
  await checkAccessibility();
  const originalViewport = page.viewportSize()!;
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
  }
  await page.setViewportSize(originalViewport);
  await page.getByRole("button", { name: "Öppna boken" }).click();
  for (let i = 0; i < 9; i++) {
    const illustration = page.locator("img").first();
    await expect(illustration).toBeVisible();
    await expect
      .poll(() =>
        illustration.evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
      )
      .toBe(true);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        `scene ${i + 1}, width ${width}`,
      ).toBe(false);
    }
    await page.setViewportSize(originalViewport);
    if (i === 0) await checkAccessibility();
    if (i === 2) {
      await page
        .getByRole("button", { name: "Ska han rätta till misstaget?" })
        .click();
      await page
        .getByRole("button", { name: "Rätta uppgifterna", exact: true })
        .click();
      await expect(page.getByRole("status")).toContainText(
        "ordning på handlingarna",
      );
      await page.getByRole("button", { name: "Fråga mamma först" }).click();
      await expect(page.getByRole("status")).toContainText(
        "pappersarbetet redan avklarat",
      );
    }
    await page
      .getByRole("button", { name: i === 8 ? "Intyget" : "Nästa sida" })
      .click();
  }
  await expect(
    page.getByRole("heading", { name: "Identitetsintyg", exact: true }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await checkAccessibility();
  await page.emulateMedia({ media: "print" });
  await expect(
    page.getByRole("button", { name: "Ladda ner intyget" }),
  ).toBeHidden();
  await expect(
    page.getByRole("heading", { name: "Identitetsintyg", exact: true }),
  ).toBeVisible();
});

test("personal letter, Swedish typography and all scenes fit narrow screens", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Öppna boken" }).click();
  await page.getByRole("button", { name: "Innehåll", exact: true }).click();
  await page
    .getByRole("button", { name: "En personlig hälsning", exact: true })
    .click();
  await expect(
    page.getByText("Din favoritbiograf på amatörnivå."),
  ).toBeVisible();
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await expect(page.locator("article strong").first()).toHaveText(
    "Grattis på födelsedagen, min käre Victor.",
  );
  await expect(page.locator("article em")).toHaveText(
    "Din favoritbiograf på amatörnivå.",
  );
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
  }
  await page.getByRole("button", { name: "Innehåll", exact: true }).click();
  await page
    .getByRole("button", { name: "04 · Lasse. Lasse Örn.", exact: true })
    .click();
  await expect(
    page.getByText("Inte något smeknamn.", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Innehåll", exact: true }).click();
  await page
    .getByRole("button", { name: "En personlig hälsning", exact: true })
    .click();
  await expect(page.getByText("12 / 13")).toBeVisible();
});

test("chapter II teaser follows the personal letter and supports contents, motion and restart", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Öppna boken" }).click();
  await page.getByRole("button", { name: "Innehåll", exact: true }).click();
  await expect(
    page
      .getByRole("navigation", { name: "Innehållsförteckning" })
      .getByRole("button"),
  ).toHaveCount(13);
  await page
    .getByRole("button", { name: "En personlig hälsning", exact: true })
    .click();
  await expect(
    page.getByText("Din favoritbiograf på amatörnivå."),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Fortsättning följer", exact: true })
    .click();
  const title = page.getByRole("heading", {
    name: "Äventyret fortsätter…",
    exact: true,
  });
  await expect(title).toBeFocused();
  await expect(page.getByText("KAPITEL II", { exact: true })).toBeVisible();
  await expect(page.locator("article em")).toHaveText(
    "Vissa historier är alldeles för bra för att sluta efter ett enda kapitel.",
  );
  await expect(page.locator("article strong")).toHaveText(
    "Fortsättning följer",
  );
  await expect
    .poll(() =>
      page
        .locator("article img")
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    )
    .toBe(true);
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
  }
  await page.getByRole("button", { name: "Föregående", exact: true }).click();
  await expect(
    page.getByText("Din favoritbiograf på amatörnivå."),
  ).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Innehåll", exact: true }).click();
  await page
    .getByRole("button", {
      name: "KAPITEL II · Äventyret fortsätter…",
      exact: true,
    })
    .click();
  await expect(title).toBeFocused();
  await expect(page.getByText("13 / 13")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Nästa sida", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Stäng boken", exact: true }).click();
  await expect(page.getByRole("button", { name: "Öppna boken" })).toBeVisible();
  await page.getByRole("button", { name: "Öppna boken" }).click();
  await page.getByRole("button", { name: "Innehåll", exact: true }).click();
  await page
    .getByRole("button", {
      name: "KAPITEL II · Äventyret fortsätter…",
      exact: true,
    })
    .click();
  await page.getByRole("button", { name: "Läs igen", exact: true }).click();
  await expect(page.getByRole("button", { name: "Öppna boken" })).toBeVisible();
});
