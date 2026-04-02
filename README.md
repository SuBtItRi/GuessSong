# GuessSong

Угадай трек: игра на React + TypeScript + Vite.

Живой сайт: https://guess-song-subtitri.netlify.app/

## Ссылки
- GitHub (заглушка): https://github.com/your-org/guesssong
- Документация/ТЗ (заглушка): https://example.com/docs
- Контакты (заглушка): https://t.me/your_channel

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
