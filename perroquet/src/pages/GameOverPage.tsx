import { useAppStore } from "../stores/appStore";
import { useLocation, useNavigate } from "react-router-dom";

export const GameOverPage = () => {
  const audience = useAppStore((state) => state.audience);
  const capital = useAppStore((state) => state.capital);
  const postCount = useAppStore((state) => state.postCount);

  // ON RÉCUPÈRE LA RAISON DE LA DÉFAITE
  const location = useLocation();
  const reason = location.state?.reason || "burnout";
  const resetGame = useAppStore((state) => state.actions.resetGame);
  const navigate = useNavigate();

  const handleRestart = () => {
    // On vide la RAM (Zustand va instantanément écraser le localStorage avec ces données vierges)
    resetGame();
    // On navigue fluidement sans recharger toute la page web
    navigate("/setup");
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-rose-500/30 rounded-2xl shadow-2xl shadow-rose-900/20 p-8 max-w-lg w-full text-center">
        {/* TITRE DYNAMIQUE */}
        <h1 className="text-5xl font-black text-rose-600 mb-2 uppercase tracking-widest">
          {reason === "burnout" ? "Burn Out" : "Flop Total"}
        </h1>

        {/* TEXTE DYNAMIQUE */}
        <p className="text-slate-400 mb-8">
          {reason === "burnout"
            ? "Votre santé mentale a atteint 0%. L'algorithme a eu raison de vos convictions."
            : "Les 10 semaines sont écoulées et vous n'avez pas atteint les 5 000 abonnés. L'algorithme vous a oublié."}
        </p>

        <div className="bg-slate-800 rounded-lg p-6 mb-8 text-left space-y-4">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider border-b border-slate-700 pb-2">
            Bilan de votre chaîne
          </h2>
          <div className="flex justify-between">
            <span className="text-slate-400">Publications :</span>
            {/* ON AFFICHE LE NOMBRE DE SEMAINE SUR 10 */}
            <span className="font-bold text-white">
              {postCount} / 10 semaines
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Audience finale :</span>
            <span className="font-bold text-indigo-400">
              {audience.toLocaleString()} abonnés
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Capital amassé :</span>
            <span className="font-bold text-emerald-400">
              {capital.toLocaleString()} €
            </span>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="w-full bg-rose-600 text-white font-black py-4 rounded-xl shadow-lg hover:bg-rose-500 transition-all active:scale-95 cursor-pointer"
        >
          RECOMMENCER UNE PARTIE
        </button>
      </div>
    </div>
  );
};
