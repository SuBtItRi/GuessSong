import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
// import { RequireAuth } from './ui/require-auth'
// import { AppLoader } from '@/shared/ui/app-loader'
import { AppRouteProps, routeConfig } from "./config";
import { Stars } from "@/shared/components/stars";
import { useGetHeightMultiplier } from "@/shared/utils/useGetHeightMultiplier";
import { Modal } from "@/shared/ui/modal";
import { useDevTools } from "../contexts/DevToolsContext";

/**
 * Основной компонент роутинга приложения
 */
export const Layout = () => {
  const { isDevToolsOpen } = useDevTools();
  const heightMultiplier = useGetHeightMultiplier();

  return (
    <Suspense>
      {/* fallback={<AppLoader />} */}
      <Routes>
        {Object.values(routeConfig)
          .filter((route): route is AppRouteProps => Boolean(route))
          .map(({ path, element }) => (
          <Route
            key={path ?? "unknown"}
            path={path}
            element={
              // authOnly ? (
              //   <RequireAuth>{element}</RequireAuth>
              // ) : (
              //   element
              // )
              element
            }
          />
        ))}
      </Routes>
      <Modal
        isOpen={isDevToolsOpen}
        title="Для корректной работы сайта закройте DevTools"
      />
      <Stars count={500} heightMultiplier={heightMultiplier} />
    </Suspense>
  );
};
