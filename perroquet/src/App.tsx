import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useGameStore } from "./stores/useGameStore";

// Importation des composants isolés
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { SetupPage } from "./pages/SetupPage";
import { StudioPage } from "./pages/StudioPage";
import { ShopPage } from "./pages/ShopPage";

function App() {
  const platform = useGameStore((state) => state.platform);

  // Sécurité : Impossible d'accéder au jeu sans configurer son profil
  if (!platform) {
    return <SetupPage />;
  }

  return (
    <BrowserRouter>
      <div className="h-screen w-screen bg-slate-100 flex overflow-hidden font-sans selection:bg-indigo-200">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <Topbar />
          <main className="flex-1 p-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<StudioPage />} />
              <Route path="/shop" element={<ShopPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
