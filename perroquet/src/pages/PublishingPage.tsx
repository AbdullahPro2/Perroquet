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
    }, 300); // Attente de 0,300 secondes

    return () => clearTimeout(timer);
  }, [navigate, location, publishContent]);

  return (
    //  Ajout de p-6 pour l'espacement intérieur, space-y-6 sur mobile
    <div className="h-full flex flex-col items-center justify-center p-6 space-y-6 md:space-y-8 bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl glass-panel">
      {/* Le spinner est légèrement plus petit sur mobile */}
      <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>

      {/* px-4 pour éviter que le texte touche les bords, tailles de police adaptées */}
      <div className="text-center px-4">
        <h2 className="text-xl md:text-2xl font-black text-white animate-pulse mb-2 md:mb-3">
          Publication en cours...
        </h2>
        <p className="text-xs md:text-sm text-slate-400">
          L'algorithme analyse votre contenu...
        </p>
      </div>
    </div>
  );
};
