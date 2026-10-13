# Акварельные иллюстрации

## Художественная система

Инструмент: встроенный `image_gen.imagegen`. Все финальные иллюстрации создаются отдельно с детским фото Виктора как основным референсом. Фото хранится вне проекта и не публикуется. Первые изображения без референса не используются в финальной книге.

Персонаж: четырёхлетний мальчик с прямой светло-русой чёлкой, круглыми щеками, маленьким носом, серьёзным взглядом и лёгкой озорной улыбкой. Тёмно-зелёный вязаный свитер, пыльно-синий джинсовый комбинезон с латунными пуговицами, красно-кремовая кепка, коричневые ботинки. В каждой сцене сохраняются лицо, возраст, одежда и пропорции.

Формат: вертикальная иллюстрация 1024 × 1536, WebP 1024 px и 512 px по ширине. Финальные пропорции подтверждаются по фактическим файлам. Рисунок без букв: весь текст накладывается средствами React.

Свет: мягкий скандинавский дневной, тёплая ностальгическая атмосфера. Палитра: слоновая кость, шалфей, лесная зелень, пыльный синий, приглушённое золото, тёплый коричневый. Техника: прозрачные акварельные заливки, деликатный карандаш, фактура бумаги и мягкие растительные края.

## Общий промпт

```text
Use case: illustration-story. Portrait 1024x1536 illustration for one coherent Scandinavian collector's storybook.
PRIMARY CHARACTER REFERENCE: attached childhood photograph, match central child's recognizable face, light brown/blond straight fringe, small nose, serious blue-eyed expression, round cheeks and slight mischievous closed-mouth smile. Same character every scene.
Outfit: dark forest green cable-knit sweater, dusty blue denim dungarees with brass buttons and red-and-cream baseball cap, brown shoes.
Ignore other people, UI dots and background in reference.
Vintage Swedish watercolor with delicate pencil linework, warm ivory paper, elegant soft botanical edges, believable four-year-old proportions, gently absurd dignified old-gentleman attitude.
Soft Nordic daylight, nostalgic mood. Palette warm ivory, muted sage, deep forest green, dusty blue, muted gold and warm brown.
Negative prompt: No text, letters, logos, watermarks, emoji, 3D, neon, modern technology or generic cartoon. Create original hand-painted art, not reproduction of photograph.
```

К общему промпту добавляется описание сцены ниже. Для орнамента персонаж не рисуется.

| Файл                | Композиция и индивидуальный промпт                                                                                                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cover.webp`        | Ornate cover art, boy confidently holding a paintbrush in a Swedish village garden, red cottage, birch botanical border and swallows, ivory space above. Full-body central subject; balanced ornate framing.                                                              |
| `neighborhood.webp` | Peaceful Swedish neighborhood, red wooden houses, birch trees, winding lane, boy walking. Wide environmental view within a portrait page, foreground daisies, quiet morning light.                                                                                        |
| `classroom.webp`    | Swedish kindergarten classroom, three other children clearly visible in the middle ground: two building wooden blocks on the floor, one drawing at a low table. Victor stands thoughtfully in the foreground. Eye-level room view, warm window light, wooden furnishings. |
| `announcement.webp` | Boy approaching two kindly women teachers with one raised finger to make an important announcement. Full-body child, adults seated at his eye level, clear gestures.                                                                                                      |
| `teachers.webp`     | Two kindly women teachers react with gentle surprise, boy explains confidently. Medium group portrait, affectionate restrained expressions, uncluttered background.                                                                                                       |
| `painter.webp`      | Friendly middle-aged man painting sage walls of a Swedish apartment with a ladder and paint bucket; boy watches. Painter and child in one domestic scene, bucket clearly visible.                                                                                         |
| `identity.webp`     | Boy proudly announcing his identity with hand on chest in a kindergarten doorway. Full-body confident portrait, child remains believable, soft sunlight.                                                                                                                  |
| `singing.webp`      | Boy joyfully singing by an open cottage window, sea and sailboat in distance, small birds. Child in three-quarter view, open mouth, gentle movement in foliage.                                                                                                           |
| `portrait.webp`     | Affectionate humorous portrait of the boy as a miniature gentleman in oversized armchair with teacup, still clearly four years old, no beard. Child-sized face and hands, comically large armchair.                                                                       |
| `ornament.webp`     | Symmetrical Nordic botanical border with birch leaves, oak twigs, swallows and gold ribbon framing a large entirely blank ivory centre; no people. Subtle decoration for certificate, large empty area for HTML text.                                                     |

## Оптимизация

`npm run assets:optimize` создаёт две WebP-версии по локальному манифесту `docs/illustration-assets.json`. Пути к исходным результатам генерации относятся к рабочей машине; для повторной оптимизации на другой машине нужно указать свои исходники. Для запуска и сборки исходные PNG не нужны.

## Финальный статус

Все 10 финальных иллюстраций созданы встроенным инструментом и сохранены в `public/illustrations/`. Заглушек нет. Для сцены класса использован уточнённый вариант с другими играющими детьми. Каждое изображение доступно в WebP 1024 × 1536 и 512 × 768. Промпты и исходные пути результатов генерации сохранены в этой папке; фото-референс в проект не скопирован.
