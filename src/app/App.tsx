import { Header } from "@/shared/ui/header";
import { Layout } from "./router";
import { RouterProvider } from "./router/ui/router-provider";
import { Footer } from "@/shared/ui/footer";
import { DevToolsProvider } from "./contexts/DevToolsContext";

function App() {
  // Providers + Router + Modals
  return (
    <DevToolsProvider>
      <RouterProvider>
        <Header />
        <Layout />
        <Footer />
      </RouterProvider>
    </DevToolsProvider>
  );
}

export default App;