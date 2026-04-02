import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./index.scss";
import "@shared/styles/global.scss";

createRoot(document.getElementById("root")!).render(<App />);
