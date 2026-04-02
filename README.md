# GuessSong

Угадай трек: игра на React + TypeScript + Vite.

Живой сайт: https://guess-song-subtitri.netlify.app/

## Ссылки

- GitHub: https://github.com/SuBtItRi/GuessSong

## Запуск локально (микро-гайд)

1. Установи зависимости:
   ```bash
   yarn install
   ```
2. Запусти dev-сервер:
   ```bash
   yarn dev
   ```
3. Открой в браузере:
   - `http://localhost:1488`

## Сборка и проверки

- Линтер:
  ```bash
  yarn lint
  ```
- Локальная production-сборка:
  ```bash
  yarn build
  ```
- (Опционально) preview:
  ```bash
  yarn preview
  ```

## Примечание по коммитам

Перед коммитом настроен `pre-commit` (husky): он прогоняет `yarn lint --fix` и `yarn build`, чтобы ловить проблемы раньше.

## Автокоммит и пуш

Чтобы одним шагом сделать `git add` → `git commit` → `git push` в `origin`:

- `yarn cpush "имя коммита"`
- `yarn cpush --all "имя коммита" ветка` (опционально: `--all` = `git add -A`)

По умолчанию пушится в ветку `master`.

Пример:
```bash
yarn cpush --all "chore: commit & push" dev
```
