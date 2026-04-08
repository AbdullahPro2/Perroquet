import { useState } from "react";
import { useAppStore } from "../stores/appStore";
import type { Theme } from "../types/game";
import { SimulationChart } from "../features/dashboard/components/SimulationChart";

export const StudioPage = () => {
  const { currentTrend, hasTrendAnalyzer, postHistory } = useAppStore();
  const { publishContent } = useAppStore((state) => state.actions);

  const [theme, setTheme] = useState<Theme>("social");
  const [format, setFormat] = useState(0);
  const [tone, setTone] = useState(0);
  const [alignment, setAlignment] = useState(0);
  const [lastPostFeedback, setLastPostFeedback] = useState<string | null>(null);

  const handlePublish = () => {
    const result = publishContent(theme, format, tone, alignment);
    setLastPostFeedback(result.feedback);
  };

  const THEMES: { id: Theme; icon: string; label: string }[] = [
    { id: "ecologie", icon: "🌍", label: "Écologie" },
    { id: "economie", icon: "📈", label: "Économie" },
    { id: "securite", icon: "🛡️", label: "Sécurité" },
    { id: "social", icon: "🤝", label: "Social" },
  ];

  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      <div className="col-span-6 bg-slate-800 rounded-2xl shadow-xl border border-slate-700 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-slate-800/50 flex flex-col gap-4">
          <h2 className="text-xl font-black text-white">
            Nouvelle Publication
          </h2>

          {hasTrendAnalyzer ? (
            <div className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-3 flex justify-between">
              <span className="text-xs font-bold text-amber-500 uppercase">
                📡 Tendance interceptée
              </span>
              <span className="text-sm font-black text-amber-400 capitalize">
                {currentTrend}
              </span>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 flex gap-2 opacity-70">
              <span className="text-slate-500">
                🔒 Achetez l'analyseur pour voir la tendance
              </span>
            </div>
          )}
        </div>

        <div className="p-8 flex-1 flex flex-col gap-8 overflow-y-auto">
          <div className="grid grid-cols-4 gap-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-2 rounded-lg border-2 flex flex-col items-center gap-1 transition-all ${theme === t.id ? "border-indigo-500 bg-indigo-900/50 text-indigo-300" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}
              >
                <span className="text-xl">{t.icon}</span>
                <span className="text-xs font-bold">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-6 border-t border-slate-700 pt-6">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                <span>Long & Sourcé</span>
                <span>Snackable</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={format}
                onChange={(e) => setFormat(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg accent-indigo-500"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                <span className="text-emerald-500">Nuancé</span>
                <span className="text-rose-500">Radical</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={tone}
                onChange={(e) => setTone(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg accent-rose-500"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                <span className="text-blue-500">Idéaliste</span>
                <span className="text-amber-500">Opportuniste (Meta)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={alignment}
                onChange={(e) => setAlignment(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg accent-amber-500"
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-900/50 border-t border-slate-700">
          <button
            onClick={handlePublish}
            className="w-full bg-indigo-600 text-white font-black text-lg py-4 rounded-xl shadow-lg hover:bg-indigo-500 transition-all"
          >
            PUBLIER
          </button>
        </div>
      </div>

      <div className="col-span-6 flex flex-col gap-6">
        <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-6 min-h-[120px] flex items-center justify-center text-center">
          {lastPostFeedback ? (
            <p className="text-lg font-bold text-white">{lastPostFeedback}</p>
          ) : (
            <p className="text-slate-500">
              L'algorithme attend votre publication...
            </p>
          )}
        </div>
        <div className="flex-1">
          <SimulationChart data={postHistory} />
        </div>
      </div>
    </div>
  );
};
