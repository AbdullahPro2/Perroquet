import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/appStore";

export const PublishingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const publishContent = useAppStore((state) => state.actions.publishContent);

  useEffect(() => {
    const timer = setTimeout(() => {
      // On exécute la publication avec les données reçues du Studio
      if (location.state) {
        const { camp, theme, format, tone } = location.state;
        publishContent(camp, theme, format, tone);
      }
      // Puis on l'envoie voir les résultats
      navigate("/result", { replace: true });
    }, 2500); // Attente de 2.5 secondes

    return () => clearTimeout(timer);
  }, [navigate, location, publishContent]);

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8 bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl glass-panel">
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <div className="text-center">
        <h2 className="text-2xl font-black text-white animate-pulse mb-2">
          Publication en cours...
        </h2>
        <p className="text-slate-400">L'algorithme analyse votre contenu...</p>
      </div>
    </div>
  );
};