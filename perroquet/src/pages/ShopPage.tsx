import { useAppStore } from "../stores/appStore";

export const ShopPage = () => {
  const { capital, hasTrendAnalyzer } = useAppStore();
  const buyTool = useAppStore((state) => state.actions.buyTool);

  return (
    <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 p-8 text-white">
      <h2 className="text-2xl font-black mb-6">Marché de la Donnée</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="border-2 border-slate-600 rounded-xl p-6 relative bg-slate-900">
          {hasTrendAnalyzer && (
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
              <span className="bg-emerald-900/50 text-emerald-400 font-bold px-4 py-2 rounded-lg border border-emerald-500/50">
                ✔️ Déjà acquis
              </span>
            </div>
          )}
          <h3 className="font-bold text-lg">Analyseur de Tendances</h3>
          <p className="text-sm text-slate-400 mt-2 mb-6">
            Découvrez le biais caché de votre plateforme.
          </p>
          <div className="flex justify-between items-center border-t border-slate-700 pt-4">
            <span className="font-black text-amber-500">200 €</span>
            <button
              onClick={() => buyTool("trendAnalyzer", 200)}
              disabled={capital < 200 || hasTrendAnalyzer}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-500 disabled:opacity-50"
            >
              Acheter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
