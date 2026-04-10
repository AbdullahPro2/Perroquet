import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../stores/appStore";

export const ResultPage = () => {
  const navigate = useNavigate();

  const { lastPostResult, postCount, audience, mentalHealth } = useAppStore();

  useEffect(() => {
    if (!lastPostResult) {
      navigate("/", { replace: true });
    }
  }, [lastPostResult, navigate]);

  if (!lastPostResult) return null;

  const { audienceGain, capitalGain, healthLoss, feedback } = lastPostResult;

  const handleContinue = () => {
    if (mentalHealth <= 0) {
      navigate("/game-over", { state: { reason: "burnout" } });
    } else if (audience >= 5000) {
      navigate("/victory");
    } else if (postCount >= 10) {
      navigate("/game-over", { state: { reason: "timeout" } });
    } else {
      navigate("/");
    }
  };

  return (
    // overflow-y-auto permet le scroll, justify-start empêche le contenu d'être poussé hors de l'écran en haut
    <div className="h-full overflow-y-auto flex flex-col items-center justify-start md:justify-center p-4">
      {/* my-auto centre la carte s'il y a de la place, sinon elle scrolle. Paddings réduits sur mobile (p-5 au lieu de p-8). */}
      <div className="bg-slate-800 border border-slate-700 p-5 md:p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center flex flex-col gap-4 md:gap-6 glass-panel my-auto shrink-0">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-1 md:mb-2">
          Bilan du Contenu
        </h2>

        <div className="bg-slate-900 border border-slate-700 p-3 md:p-4 rounded-xl">
          <p className="text-base md:text-lg font-bold text-amber-400 leading-snug">
            {feedback}
          </p>
        </div>

        <div className="space-y-3 md:space-y-4 text-left mt-1 md:mt-2">
          <div className="flex justify-between items-center bg-slate-900/50 p-3 md:p-4 rounded-lg">
            <span className="text-slate-400 font-bold uppercase text-[10px] md:text-xs tracking-wider">
              {audienceGain >= 0 ? "Abonnés gagnés" : "Abonnés perdus"}
            </span>
            <span
              className={`text-lg md:text-xl font-black ${audienceGain >= 0 ? "text-blue-500" : "text-rose-500"}`}
            >
              {audienceGain > 0 ? `+${audienceGain}` : audienceGain}
            </span>
          </div>

          <div className="flex justify-between items-center bg-slate-900/50 p-3 md:p-4 rounded-lg">
            <span className="text-slate-400 font-bold uppercase text-[10px] md:text-xs tracking-wider">
              Revenus générés
            </span>
            <span className="text-lg md:text-xl font-black text-emerald-500">
              +{capitalGain} €
            </span>
          </div>

          <div className="flex justify-between items-center bg-slate-900/50 p-3 md:p-4 rounded-lg flex-wrap gap-1">
            <span className="text-slate-400 font-bold uppercase text-[10px] md:text-xs tracking-wider">
              Santé Mentale
            </span>
            <span
              className={`text-lg md:text-xl font-black ${healthLoss > 0 ? "text-rose-500" : "text-emerald-500"}`}
            >
              {healthLoss > 0
                ? `-${healthLoss}%`
                : `+${-healthLoss}% (Reposant)`}
            </span>
          </div>
        </div>

        <button
          onClick={handleContinue}
          // py-4 sur mobile pour un bouton confortable
          className="mt-2 md:mt-4 w-full bg-indigo-600 text-white font-black text-base md:text-lg py-4 rounded-xl shadow-lg hover:bg-indigo-500 transition-all active:scale-95"
        >
          {postCount >= 10 ? "VOIR LE RÉSULTAT FINAL" : "SEMAINE SUIVANTE"}
        </button>
      </div>
    </div>
  );
};
