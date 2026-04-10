import { useAppStore } from "../stores/appStore";

export const VictoryPage = () => {
  const { audience, capital, mentalHealth } = useAppStore();

  const handleRestart = () => {
    localStorage.removeItem("perroquet-game-v4"); 
    sessionStorage.removeItem("perroquet-game-v4");
    window.location.replace("/setup");
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl shadow-2xl shadow-emerald-900/20 p-8 max-w-lg w-full text-center">
        
        <h1 className="text-5xl font-black text-emerald-500 mb-2 uppercase tracking-widest">
          Succès Viral !
        </h1>
        <p className="text-emerald-100 mb-8">
          Incroyable ! Vous avez dominé l'algorithme et dépassé les 5 000 abonnés en moins de 10 semaines.
        </p>

        <div className="bg-slate-800 rounded-lg p-6 mb-8 text-left space-y-4">
          <h2 className="text-sm font-bold text-emerald-500/50 uppercase tracking-wider border-b border-slate-700 pb-2">
            Bilan de votre réussite
          </h2>
          <div className="flex justify-between">
            <span className="text-slate-400">Audience finale :</span>
            <span className="font-bold text-indigo-400">{audience.toLocaleString()} abonnés</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Santé mentale restante :</span>
            <span className="font-bold text-amber-400">{mentalHealth}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Capital amassé :</span>
            <span className="font-bold text-emerald-400">{capital.toLocaleString()} €</span>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="w-full bg-emerald-600 text-white font-black py-4 rounded-xl shadow-lg hover:bg-emerald-500 transition-all active:scale-95 cursor-pointer"
        >
          REJOUER POUR FAIRE MIEUX
        </button>
      </div>
    </div>
  );
};