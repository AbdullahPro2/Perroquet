import { useEffect, useRef } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { useAppStore } from "../stores/appStore";
import { motion } from "motion/react";
import { Toaster, toast } from "react-hot-toast";

export const RootLayout = () => {
  const platform = useAppStore((state) => state.platform);
  const hasSeenIntro = useAppStore((state) => state.hasSeenIntro);
  const capital = useAppStore((state) => state.capital);

  // Refs pour s'assurer que la popup ne s'affiche qu'une seule fois par partie
  const hasNotified200 = useRef(false);
  const hasNotified500 = useRef(false);

  // Ce useEffect surveille la trésorerie en permanence
  useEffect(() => {
    if (capital >= 200 && !hasNotified200.current) {
      toast("Vous avez les fonds pour l'Analyseur de Tendances !", {
        icon: "🛒",
        duration: 4000,
        style: {
          borderRadius: "10px",
          background: "#1e293b", // bg-slate-800
          color: "#fff",
          border: "1px solid #334155", // border-slate-700
        },
      });
      hasNotified200.current = true;
    }

    if (capital >= 500 && !hasNotified500.current) {
      toast("Un nouveau document confidentiel est accessible...", {
        icon: "📂",
        duration: 5000,
        style: {
          borderRadius: "10px",
          background: "#1e293b",
          color: "#fff",
          border: "1px solid #f43f5e", // Bordure rouge pour le côté "secret"
        },
      });
      hasNotified500.current = true;
    }
  }, [capital]); // Se déclenche à chaque modification du capital

  if (!hasSeenIntro) {
    return <Navigate to="/intro" replace />;
  }

  if (!platform) {
    return <Navigate to="/setup" replace />;
  }

  return (
    <div className="flex h-[100dvh] w-full bg-slate-950 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* C'est ce composant invisible qui gère l'affichage des popups par-dessus le jeu */}
      <Toaster position="top-center" reverseOrder={false} />

      <Sidebar />

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 min-w-0 h-full relative">
        <Topbar />

        <motion.main
          className="flex-1 overflow-y-auto p-4 pb-24 md:p-8 md:pb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};