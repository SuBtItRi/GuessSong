import { RouteProps } from "react-router-dom";
import { MainPage, QuickPlayPage, GamePage } from "@pages/index";
import { AppRoutes, RoutePath } from "./const";
import { NotFoundPage } from "@/pages/not-found";

/**
 * Типизация маршрутов с дополнительными полями
 */
export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
  roles?: string[];
};

/**
 * Конфигурация всех маршрутов приложения
 */
export const routeConfig: Partial<Record<AppRoutes, AppRouteProps>> = {
  [AppRoutes.MAIN]: {
    path: RoutePath[AppRoutes.MAIN],
    element: <MainPage />,
  },
  [AppRoutes.QUICK_PLAY]: {
    path: RoutePath[AppRoutes.QUICK_PLAY],
    element: <QuickPlayPage />,
  },
  [AppRoutes.GAME]: {
    path: RoutePath[AppRoutes.GAME],
    element: <GamePage />,
  },
  // [AppRoutes.PROFILE]: {
  //   path: RoutePath.profile(':id'),
  //   element: <ProfilePage />,
  //   authOnly: true,
  // },
  // [AppRoutes.LOGIN]: {
  //   path: RoutePath.login,
  //   element: <LoginPage />,
  // },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
