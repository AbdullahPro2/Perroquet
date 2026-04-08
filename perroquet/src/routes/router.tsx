import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { SetupPage } from "../pages/SetupPage"; // Plus tard dans /features/onboarding
import { StudioPage } from "../pages/StudioPage"; // Plus tard dans /features/dashboard
import { ShopPage } from "../pages/ShopPage";

export const router = createBrowserRouter([
  {
    path: "/setup",
    element: <SetupPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    // Tout ce qui est dans "children" apparaîtra à la place du <Outlet />
    children: [
      {
        index: true, // Route par défaut (Studio)
        element: <StudioPage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
    ],
  },
]);
