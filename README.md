BlackIce website by Night Walrus Development
https://github.com/AprilBoy | @AprilBoy

Just static website for Moscow mountaneering and climbing club.
Some Ideas to add Store and MonogoDB

Credits:

    Icons:
    	Font Awesome (fontawesome.io)

    Other:
    	ReactJS 18
        TypeScript

## Деплой на GitHub Pages

Проект настроен для автоматического деплоя на GitHub Pages через GitHub Actions.

### Первоначальная настройка

1. **Обновите поле `homepage` в `package.json`**:
   - Замените `YOUR_USERNAME` на ваш GitHub username
   - Если репозиторий называется иначе, обновите название репозитория
   - Формат: `https://YOUR_USERNAME.github.io/REPOSITORY_NAME`

2. **Включите GitHub Pages в настройках репозитория**:
   - Перейдите в Settings → Pages
   - В разделе "Source" выберите "GitHub Actions"
   - Сохраните изменения

3. **Установите зависимости** (если еще не установлены):
   ```bash
   npm install
   ```

### Автоматический деплой

После настройки, каждый push в ветку `master` автоматически запустит деплой через GitHub Actions.

### Ручной деплой

Если нужно задеплоить вручную:

```bash
npm run deploy
```

Или используйте GitHub Actions:
- Перейдите в раздел Actions
- Выберите workflow "Deploy to GitHub Pages"
- Нажмите "Run workflow"

### Локальная разработка

```bash
npm start
```

Приложение будет доступно на `http://localhost:3000`

### Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут в папке `build/`
