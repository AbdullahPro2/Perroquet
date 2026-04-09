import { useAppStore } from "../stores/appStore";

export const ShopPage = () => {
  const { capital, hasTrendAnalyzer, hasPoliticalDoc } = useAppStore();
  const buyTool = useAppStore((state) => state.actions.buyTool);

  return (
    <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 p-8 text-white">
      <h2 className="text-2xl font-black mb-6">Marché de la Donnée</h2>
      
      <div className="grid grid-cols-2 gap-6">
        {/* OUTIL 1 : Analyseur de Tendances */}
        <div className="border-2 border-slate-600 rounded-xl p-6 relative bg-slate-900 flex flex-col">
          {hasTrendAnalyzer && (
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
              <span className="bg-emerald-900/50 text-emerald-400 font-bold px-4 py-2 rounded-lg border border-emerald-500/50">
                ✔️ Déjà acquis
              </span>
            </div>
          )}
          <h3 className="font-bold text-lg">Analyseur de Tendances</h3>
          <p className="text-sm text-slate-400 mt-2 mb-6 flex-1">
            Découvrez en temps réel les thèmes qui buzzent sur la plateforme.
          </p>
          <div className="flex justify-between items-center border-t border-slate-700 pt-4">
            <span className="font-black text-amber-500">200 €</span>
            <button
              onClick={() => buyTool("trendAnalyzer", 200)}
              disabled={capital < 200 || hasTrendAnalyzer}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Acheter
            </button>
          </div>
        </div>

        {/* OUTIL 2 : Document Politique */}
        <div className="border-2 border-slate-600 rounded-xl p-6 relative bg-slate-900 flex flex-col">
          {hasPoliticalDoc ? (
            // VUE APRÈS ACHAT : Le document révélé
            <div className="flex flex-col h-full">
              <h3 className="font-bold text-lg text-rose-500 flex items-center gap-2 mb-3">
                📂 Dossier Confidentiel : Méta X-Sphere
              </h3>
              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs leading-relaxed text-slate-300 flex-1">
                <p className="mb-2">
                  <span className="font-bold text-white">Conclusion :</span> L'algorithme de X-Sphere récompense le clivage émotionnel fort.
                </p>
                <p className="mb-3">
                  <span className="text-emerald-400 font-bold">La Meta :</span> S'aligner sur des positions d'<span className="font-bold text-white">Extrême (Droite ou Gauche)</span> avec un ton <span className="font-bold text-white">Radical</span> garantit des vues massives.
                </p>
                <div className="bg-rose-950/50 border border-rose-500/30 p-2 rounded">
                  <p className="text-rose-400 font-bold">⚠️ AVERTISSEMENT PSYCHOLOGIQUE</p>
                  <p className="text-rose-300 mt-1">
                    Jouer un rôle extrême qui contredit vos convictions réelles endommagera gravement votre Santé Mentale. La rentabilité a un coût moral.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // VUE AVANT ACHAT : La boutique
            <div className="flex flex-col h-full">
               <h3 className="font-bold text-lg leading-tight">Bords Politiques Optimaux sur X-Sphere</h3>
              <p className="text-sm text-slate-400 mt-2 mb-6 flex-1">
                Achetez les résultats de cet audit indépendant. Il révèle secrètement quels bords politiques l'algorithme met en avant. <br/><span className="text-indigo-400 text-xs font-bold mt-2 block">(Débloque de nouvelles options de création)</span>
              </p>
              <div className="flex justify-between items-center border-t border-slate-700 pt-4">
                <span className="font-black text-amber-500">500 €</span>
                <button
                  onClick={() => buyTool("politicalDoc", 500)} // <--- Nécessite la MAJ du store (cf fin de ma réponse)
                  disabled={capital < 500}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Acheter
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};