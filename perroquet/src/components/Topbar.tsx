import { useAppStore } from "../stores/appStore";

export const Topbar = () => {
  const { audience, capital, mentalHealth } = useAppStore();

  return (
    <header className="h-20 bg-white shadow-sm border-b border-slate-200 flex items-center justify-end px-8 shrink-0 gap-8 z-10">
      <div className="flex items-center gap-3">
        <span className="text-3xl">👀</span>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Audience Globale
          </span>
          <span className="text-xl font-black text-blue-600">
            {audience.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 border-l border-slate-200 pl-8">
        <span className="text-3xl">💰</span>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Trésorerie
          </span>
          <span className="text-xl font-black text-amber-500">{capital} €</span>
        </div>
      </div>

      <div className="flex flex-col justify-center w-32 border-l border-slate-200 pl-8">
        <div className="flex justify-between text-[10px] font-bold mb-1 uppercase tracking-wider">
          <span className="text-slate-500">Santé Mentale</span>
          <span
            className={
              mentalHealth < 30
                ? "text-rose-500 animate-pulse"
                : "text-slate-700"
            }
          >
            {mentalHealth}%
          </span>
        </div>
        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-500 ${mentalHealth < 30 ? "bg-rose-500" : "bg-emerald-500"}`}
            style={{ width: `${mentalHealth}%` }}
          ></div>
        </div>
      </div>
    </header>
  );
};
