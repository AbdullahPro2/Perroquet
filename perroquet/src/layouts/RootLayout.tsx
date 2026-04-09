import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { useAppStore } from "../stores/appStore";
import { motion } from "motion/react"; // Assure-toi d'utiliser "framer-motion" si tu n'utilises pas la version 12 "motion/react"

export const RootLayout = () => {
  const platform = useAppStore((state) => state.platform);
  // NOUVEAU : On récupère l'état de l'intro
  const hasSeenIntro = useAppStore((state) => state.hasSeenIntro); 

  // 1. S'il n'a pas vu l'intro, on l'y envoie en priorité absolue
  if (!hasSeenIntro) {
    return <Navigate to="/intro" replace />;
  }

  // 2. S'il a vu l'intro mais n'a pas fait son setup, on l'envoie au setup
  if (!platform) {
    return <Navigate to="/setup" replace />;
  }

  // 3. Sinon, il accède au jeu normal
  return (
    <div className="h-screen w-screen bg-slate-900 flex overflow-hidden font-sans selection:bg-indigo-500/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Topbar />

        <motion.main
          className="flex-1 p-8 overflow-y-auto"
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