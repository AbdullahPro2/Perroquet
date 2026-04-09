import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { useAppStore } from "../stores/appStore";
import { motion } from "motion/react";

export const RootLayout = () => {
  const platform = useAppStore((state) => state.platform);
  const hasSeenIntro = useAppStore((state) => state.hasSeenIntro);

  if (!hasSeenIntro) {
    return <Navigate to="/intro" replace />;
  }

  if (!platform) {
    return <Navigate to="/setup" replace />;
  }

  return (
    // 100dvh is critical for mobile browsers to avoid the URL bar hiding the bottom of the app
    <div className="flex h-[100dvh] w-full bg-slate-950 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* The Sidebar will handle its own mobile (bottom) vs desktop (left) positioning */}
      <Sidebar />

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 min-w-0 h-full relative">
        <Topbar />

        {/* pb-24 gives plenty of scroll room on mobile so content isn't trapped under the nav */}
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
