import { useNavigate } from "react-router-dom";
import { useAppStore } from "../stores/appStore";

export const IntroPage = () => {
  const navigate = useNavigate();
  const markIntroSeen = useAppStore((state) => state.actions.markIntroSeen);

  const handleStart = () => {
    markIntroSeen();
    navigate("/setup");
  };

  return (
    <div className="min-h-[100dvh] w-full bg-slate-950 flex flex-col items-center justify-center p-4 md:p-6 selection:bg-indigo-500/30">
      <div className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Décoration d'arrière-plan */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500"></div>

        <h1 className="text-3xl md:text-4xl font-black text-white mb-6 md:mb-8 tracking-tight">
          Bienvenue Au Perroquet.
        </h1>

        <div className="space-y-4 md:space-y-6 text-slate-300 text-base md:text-lg leading-relaxed mb-8 md:mb-10">
          <p>
            Vous êtes un streameur débutant. Vous souhaitez organiser vos
            futures publications et découvrir quel type de contenu fonctionne le
            mieux selon la plateforme.
          </p>
          <p>
            Mais{" "}
            <span className="text-indigo-400 font-bold">
              vous ne contrôlez pas les règles du jeu.
            </span>
          </p>
          <div className="bg-slate-800/50 border-l-4 border-indigo-500 p-3 md:p-4 rounded-r-lg text-xs md:text-sm text-slate-400 italic">
            Votre objectif : Trouver le point d'équilibre précaire entre la
            survie financière de votre chaîne, l'obéissance aux algorithmes, et
            votre propre santé mentale.
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-indigo-600 text-white font-black text-lg md:text-xl py-4 md:py-5 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all active:scale-95"
        >
          J'AI COMPRIS, COMMENCER
        </button>
      </div>
    </div>
  );
};
