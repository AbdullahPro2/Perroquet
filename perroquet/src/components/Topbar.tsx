import { useAppStore } from "../stores/appStore";

export const Topbar = () => {
  const { audience, capital, mentalHealth } = useAppStore();

  return (
    // Mobile-first: flex-col, background dark, p-4. Desktop: flex-row, transparent, h-20.
    <header className="flex flex-col p-4 gap-3 bg-slate-900 border-b border-slate-800 shrink-0 z-10 md:flex-row md:h-20 md:items-center md:justify-end md:gap-8 md:px-8 md:py-0 md:bg-transparent md:border-slate-800/50">
      {/* Top Block: Audience and Capital */}
      <div className="flex justify-between items-center w-full md:w-auto md:justify-end md:gap-8">
        {/* Audience */}
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-2xl md:text-3xl">👀</span>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">
              Audience
            </span>
            <span className="text-lg md:text-xl font-black text-blue-500 leading-none">
              {audience.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Treasury */}
        <div className="flex items-center gap-2 md:gap-3 md:border-l md:border-slate-700/50 md:pl-8">
          <span className="text-2xl md:text-3xl">💰</span>
          <div className="flex flex-col text-right md:text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">
              Trésorerie
            </span>
            <span className="text-lg md:text-xl font-black text-amber-500 leading-none">
              {capital} €
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Block: Mental Health */}
      <div className="w-full md:w-40 flex flex-col justify-center md:border-l md:border-slate-700/50 md:pl-8">
        <div className="flex justify-between items-end mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 leading-none">
            Santé Mentale
          </span>
          <span
            className={`text-[10px] font-bold leading-none ${
              mentalHealth < 30
                ? "text-rose-500 animate-pulse"
                : "text-slate-300"
            }`}
          >
            {mentalHealth}%
          </span>
        </div>
        {/* Progress Bar Track */}
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-700/50">
          {/* Progress Bar Fill */}
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              mentalHealth < 30 ? "bg-rose-500" : "bg-emerald-500"
            }`}
            style={{ width: `${mentalHealth}%` }}
          ></div>
        </div>
      </div>
    </header>
  );
};
