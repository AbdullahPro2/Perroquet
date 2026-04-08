import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { useAppStore } from "../stores/appStore";
import { motion } from "motion/react";

export const RootLayout = () => {
  const platform = useAppStore((state) => state.platform);

  if (!platform) {
    return <Navigate to="/setup" replace />;
  }

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
