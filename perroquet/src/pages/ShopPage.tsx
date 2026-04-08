import { useGameStore } from "../stores/useGameStore";

export const ShopPage = () => {
  const { capital, buyTool, hasTrendAnalyzer } = useGameStore();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-black text-slate-800 mb-6">
        Marché de la Donnée
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="border-2 border-slate-100 rounded-xl p-6 relative">
          {hasTrendAnalyzer && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
              <span className="bg-emerald-100 text-emerald-700 font-bold px-4 py-2 rounded-lg">
                ✔️ Déjà acquis
              </span>
            </div>
          )}
          <h3 className="font-bold text-lg text-slate-800">
            Analyseur de Tendances
          </h3>
          <p className="text-sm text-slate-500 mt-2 mb-6">
            Découvrez le biais caché de votre plateforme.
          </p>
          <div className="flex justify-between items-center border-t border-slate-100 pt-4">
            <span className="font-black text-amber-600">200 €</span>
            <button
              onClick={() => buyTool("trendAnalyzer", 200)}
              disabled={capital < 200 || hasTrendAnalyzer}
              className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-bold hover:bg-indigo-200 disabled:opacity-50"
            >
              Acheter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
