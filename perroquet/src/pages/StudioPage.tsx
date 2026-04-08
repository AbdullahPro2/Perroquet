import { useState } from "react";
import { useGameStore } from "../stores/useGameStore";

export const StudioPage = () => {
  const { publishContent, platform, camp } = useGameStore();
  const [format, setFormat] = useState(0);
  const [tone, setTone] = useState(0);
  const [alignment, setAlignment] = useState(0);
  const [lastPostFeedback, setLastPostFeedback] = useState<string | null>(null);

  const handlePublish = () => {
    publishContent({ format, tone, alignment });
    if (tone > 80 && alignment > 80)
      setLastPostFeedback(
        "🔥 MEGA BUZZ : Le clash a marché, mais vous vous sentez sale.",
      );
    else if (format < 20 && tone < 20)
      setLastPostFeedback(
        "📉 FLOP TOTAL : Thread ultra-sourcé ignoré par l'algorithme.",
      );
    else setLastPostFeedback("📊 PERFORMANCE MOYENNE : Un post classique.");
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      <div className="col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h2 className="text-xl font-black text-slate-800">
            Nouvelle Publication
          </h2>
          <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
            {platform} • {camp}
          </span>
        </div>

        <div className="p-8 flex-1 flex flex-col gap-8">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold text-slate-700">
              <span>Long & Sourcé (0)</span>
              <span>Court & Snackable (100)</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={format}
              onChange={(e) => setFormat(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg accent-indigo-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold text-slate-700">
              <span className="text-emerald-600">Nuancé & Pédago (0)</span>
              <span className="text-rose-600">Radical & Clivant (100)</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={tone}
              onChange={(e) => setTone(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg accent-rose-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold text-slate-700">
              <span className="text-blue-600">Fidèle à mes idéaux (0)</span>
              <span className="text-amber-600">
                Suivre la Tendance Meta (100)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={alignment}
              onChange={(e) => setAlignment(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg accent-amber-500"
            />
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <button
            onClick={handlePublish}
            className="w-full bg-indigo-600 text-white font-black text-lg py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all"
          >
            PUBLIER LE CONTENU
          </button>
        </div>
      </div>

      <div className="col-span-5 bg-slate-900 rounded-2xl shadow-xl border-4 border-slate-800 p-6 text-slate-300 flex flex-col">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
          Analyse Algorithmique
        </h3>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {lastPostFeedback ? (
            <div>
              <div className="text-4xl mb-4">📱</div>
              <p className="text-lg font-bold text-white mb-2">
                {lastPostFeedback}
              </p>
            </div>
          ) : (
            <div className="opacity-50">
              <div className="text-4xl mb-2">📊</div>
              <p>En attente de publication...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
