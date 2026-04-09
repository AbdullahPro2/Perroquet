import { useAppStore } from "../stores/appStore";

export const GameOverPage = () => {
  // On récupère juste les stats pour l'affichage
  const audience = useAppStore((state) => state.audience);
  const capital = useAppStore((state) => state.capital);
  const postCount = useAppStore((state) => state.postCount);

  const handleRestart = () => {
    // 1. On détruit la sauvegarde persistante directement dans le navigateur
    localStorage.removeItem("perroquet-game-v4"); 
    
    // 2. On force un rechargement complet (hard-reload) vers la page setup
    // Cela réinitialise entièrement React et Zustand, garantissant un jeu neuf à 100%
    window.location.href = "/setup";
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-rose-500/30 rounded-2xl shadow-2xl shadow-rose-900/20 p-8 max-w-lg w-full text-center">
        
        <h1 className="text-5xl font-black text-rose-600 mb-2 uppercase tracking-widest">
          Burn Out
        </h1>
        <p className="text-slate-400 mb-8">
          Votre santé mentale a atteint 0%. L'algorithme a eu raison de vos convictions.
        </p>

        <div className="bg-slate-800 rounded-lg p-6 mb-8 text-left space-y-4">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider border-b border-slate-700 pb-2">
            Bilan de votre chaîne
          </h2>
          <div className="flex justify-between">
            <span className="text-slate-400">Publications :</span>
            <span className="font-bold text-white">{postCount} semaines</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Audience finale :</span>
            <span className="font-bold text-indigo-400">{audience.toLocaleString()} abonnés</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Capital amassé :</span>
            <span className="font-bold text-emerald-400">{capital.toLocaleString()} €</span>
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