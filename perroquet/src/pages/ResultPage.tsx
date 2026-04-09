import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../stores/appStore";

export const ResultPage = () => {
  const navigate = useNavigate();
  
  const { lastPostResult, postCount, audience, mentalHealth } = useAppStore();

  // Sécuriser la redirection dans un useEffect (Bonne pratique React)
  useEffect(() => {
    if (!lastPostResult) {
      navigate("/", { replace: true });
    }
  }, [lastPostResult, navigate]);

  // Si pas de données, on ne rend rien le temps d'être redirigé
  if (!lastPostResult) return null;

  const { audienceGain, capitalGain, healthLoss, feedback } = lastPostResult;

  // --- L'ARBITRE DE FIN DE PARTIE ---
  const handleContinue = () => {
    if (mentalHealth <= 0) {
      // MORT : Santé mentale à zéro
      navigate("/game-over", { state: { reason: "burnout" } });
    } 
    else if (audience >= 5000) {
      // VICTOIRE : Objectif atteint prématurément !
      navigate("/victory");
    } 
    else if (postCount >= 10) {
      // DÉFAITE : Temps écoulé sans atteindre les 5000
      navigate("/game-over", { state: { reason: "timeout" } });
    } 
    else {
      // ON CONTINUE : Le jeu suit son cours
      navigate("/");
    }
  };
  // ----------------------------------

  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center flex flex-col gap-6 glass-panel">
        
        <h2 className="text-3xl font-black text-white mb-2">Bilan du Contenu</h2>
        
        {/* Le message de l'algo */}
        <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl">
          <p className="text-lg font-bold text-amber-400">{feedback}</p>
        </div>

        {/* Les stats */}
        <div className="space-y-4 text-left mt-2">
          <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-lg">
            <span className="text-slate-400 font-bold uppercase text-xs tracking-wider">
              {/* Le texte s'adapte automatiquement */}
              {audienceGain >= 0 ? "Abonnés gagnés" : "Abonnés perdus"}
            </span>
            <span className={`text-xl font-black ${audienceGain >= 0 ? 'text-blue-500' : 'text-rose-500'}`}>
              {/* On affiche un "+" si c'est positif. Si c'est négatif, le signe "-" y est déjà. */}
              {audienceGain > 0 ? `+${audienceGain}` : audienceGain}
            </span>
          </div>
          
          <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-lg">
            <span className="text-slate-400 font-bold uppercase text-xs tracking-wider">Revenus générés</span>
            <span className="text-xl font-black text-emerald-500">+{capitalGain} €</span>
          </div>
          
          <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-lg">
            <span className="text-slate-400 font-bold uppercase text-xs tracking-wider">Santé Mentale</span>
            <span className={`text-xl font-black ${healthLoss > 0 ? "text-rose-500" : "text-emerald-500"}`}>
              {healthLoss > 0 ? `-${healthLoss}%` : `+${-healthLoss}% (Reposant)`}
            </span>
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="mt-4 w-full bg-indigo-600 text-white font-black text-lg py-4 rounded-xl shadow-lg hover:bg-indigo-500 transition-all active:scale-95"
        >
          {/* Le texte s'adapte si la partie est terminée (victoire, limite de temps, ou burnout) */}
          {audience >= 5000 || postCount >= 10 || mentalHealth <= 0 
            ? "VOIR LE RÉSULTAT FINAL" 
            : "SEMAINE SUIVANTE"}
        </button>
      </div>
    </div>
  );
};