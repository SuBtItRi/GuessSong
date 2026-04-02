import { QuickPlay } from "../../shared/components/quick-play";
import { WelcomeScreen } from "./ui/welcome-screen";

export const MainPage = () => {
  return (
    <>
      <WelcomeScreen />
      <QuickPlay isRandom />
    </>
  );
};
