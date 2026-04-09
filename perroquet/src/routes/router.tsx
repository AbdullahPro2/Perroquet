import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { SetupPage } from "../pages/SetupPage";
import { StudioPage } from "../pages/StudioPage";
import { ShopPage } from "../pages/ShopPage";
import { GameOverPage } from "../pages/GameOverPage";
import { PublishingPage } from "../pages/PublishingPage";
import { ResultPage } from "../pages/ResultPage";
import { VictoryPage } from "../pages/VictoryPage";

export const router = createBrowserRouter([
  {
    path: "/setup",
    element: <SetupPage />,
  },
  {
    path: "/game-over",
    element: <GameOverPage />
  },
  {
    path: "/victory",
    element: <VictoryPage />
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <StudioPage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "publishing",
        element: <PublishingPage />,
      },
      {
        path: "result",
        element: <ResultPage />,
      }
    ],
  },
]);