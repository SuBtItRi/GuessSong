// Перечисление всех маршрутов приложения
export enum AppRoutes {
  MAIN = "main",
  QUICK_PLAY = 'quickplay',
  GAME = "game",
  PROFILE = "profile",
  LOGIN = "login",
  NOT_FOUND = "not_found",
}

// Для `react-router-dom` поле `path` — это строка (а не функция).
// Если потребуется генерация URL для профиля по `id`, сделаем отдельный helper.
export type returnUrl = string;

// Генерация путей с параметрами
export const RoutePath: Record<AppRoutes, returnUrl> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.QUICK_PLAY]: "/quickplay",
  [AppRoutes.GAME]: "/game",
  [AppRoutes.PROFILE]: "/profile/:id",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.NOT_FOUND]: "*",
};
