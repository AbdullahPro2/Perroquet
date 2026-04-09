import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../stores/appStore";
import type { Theme, Camp } from "../types/game";
import { SimulationChart } from "../features/dashboard/components/SimulationChart";

export const StudioPage = () => {
  const navigate = useNavigate();

  const {
    currentTrend,
    hasTrendAnalyzer,
    hasPoliticalDoc,
    postHistory,
    postCount,
  } = useAppStore();

  const [camp, setCamp] = useState<Camp>("gauche");
  const [theme, setTheme] = useState<Theme>("ecologie");
  const [format, setFormat] = useState<"court" | "long">("court");
  const [tone, setTone] = useState<"nuance" | "radical">("nuance");

  const handlePublish = () => {
    navigate("/publishing", { state: { camp, theme, format, tone } });
  };

  const CAMPS: { id: Camp; label: string }[] = [
    { id: "extreme_gauche", label: "Extrême Gauche" },
    { id: "gauche", label: "Gauche" },
    { id: "centre", label: "Centre" },
    { id: "droite", label: "Droite" },
    { id: "extreme_droite", label: "Extrême Droite" },
  ];

  const THEMES: { id: Theme; icon: string; label: string }[] = [
    { id: "immigration", icon: "🛂", label: "Immigration" },
    { id: "ecologie", icon: "🌍", label: "Écologie" },
    { id: "guerre", icon: "⚔️", label: "Guerre" },
    { id: "science", icon: "🔬", label: "Science" },
  ];

  return (
    // FIX 1: "h-full" changed to "xl:h-full". On mobile, the container expands infinitely downwards.
    <div className="flex flex-col xl:grid xl:grid-cols-12 gap-6 xl:h-full">
      <div className="xl:col-span-6 bg-slate-800 rounded-2xl shadow-xl border border-slate-700 flex flex-col xl:overflow-hidden">
        {/* EN-TÊTE */}
        <div className="p-4 md:p-6 border-b border-slate-700 bg-slate-800/50 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <h2 className="text-xl font-black text-white">Création</h2>
            <div className="w-full md:w-auto bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 flex justify-between md:justify-start items-center gap-2 md:gap-3 shadow-inner">
              <span className="text-slate-400 font-bold text-xs md:text-sm">
                Semaine {postCount + 1}/10
              </span>
              <div className="h-4 w-px bg-slate-700"></div>
              <span className="text-indigo-400 font-black text-xs md:text-sm">
                Objectif : 5 000
              </span>
            </div>
          </div>

          {hasTrendAnalyzer ? (
            <div className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-1 md:gap-0">
              <span className="text-[10px] md:text-xs font-bold text-amber-500 uppercase">
                📡 Tendance de la semaine
              </span>
              <span className="text-sm font-black text-amber-400 capitalize">
                {currentTrend}
              </span>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 flex gap-2 opacity-70">
              <span className="text-slate-500 text-[10px] md:text-sm leading-tight">
                🔒 Achetez l'analyseur pour voir la tendance
              </span>
            </div>
          )}
        </div>

        {/* CONTENU - FIX 3: Removed "flex-1 overflow-y-auto" on mobile so it never squishes to 0 height */}
        <div className="p-4 md:p-6 flex flex-col gap-6 xl:flex-1 xl:overflow-y-auto">
          {/* SECTION DES CAMPS POLITIQUES */}
          <div>
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-2 block">
              Camp Politique
            </span>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              {CAMPS.map((c) => {
                const isExtreme =
                  c.id === "extreme_gauche" || c.id === "extreme_droite";
                const isDisabled = isExtreme && !hasPoliticalDoc;

                return (
                  <button
                    key={c.id}
                    onClick={() => setCamp(c.id)}
                    disabled={isDisabled}
                    className={`px-2 md:px-3 py-2 rounded-lg border-2 text-[10px] md:text-xs font-bold transition-all sm:flex-1 ${
                      isDisabled
                        ? "border-slate-800 bg-slate-800 text-slate-600 cursor-not-allowed"
                        : camp === c.id
                          ? "border-indigo-500 bg-indigo-900/50 text-indigo-300"
                          : "border-slate-700 text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    {isDisabled ? "🔒 Bloqué" : c.label}
                  </button>
                );
              })}
            </div>
            {!hasPoliticalDoc && (
              <p className="text-[9px] md:text-[10px] text-slate-500 mt-2 italic text-center leading-tight">
                (Achetez le document stratégique dans la boutique pour débloquer
                de nouvelles approches).
              </p>
            )}
          </div>

          {/* SECTION DES THÈMES */}
          <div>
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-2 block">
              Thème Abordé
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-2 md:p-3 rounded-lg border-2 flex flex-col items-center gap-1 transition-all ${
                    theme === t.id
                      ? "border-indigo-500 bg-indigo-900/50 text-indigo-300"
                      : "border-slate-700 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  <span className="text-xl md:text-2xl">{t.icon}</span>
                  <span className="text-[10px] md:text-xs font-bold text-center">
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* FORMAT & TON */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 border-t border-slate-700 pt-6">
            <div>
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-2 block text-center lg:text-left">
                Format
              </span>
              <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
                <button
                  className={`flex-1 py-3 lg:py-2 text-[10px] md:text-xs font-bold rounded ${format === "court" ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-300"}`}
                  onClick={() => setFormat("court")}
                >
                  Court / Snack
                </button>
                <button
                  className={`flex-1 py-3 lg:py-2 text-[10px] md:text-xs font-bold rounded ${format === "long" ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-300"}`}
                  onClick={() => setFormat("long")}
                >
                  Long / Sourcé
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-2 block text-center lg:text-left">
                Ton
              </span>
              <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
                <button
                  className={`flex-1 py-3 lg:py-2 text-[10px] md:text-xs font-bold rounded ${tone === "nuance" ? "bg-emerald-600 text-white" : "text-slate-500 hover:text-slate-300"}`}
                  onClick={() => setTone("nuance")}
                >
                  Nuancé
                </button>
                <button
                  className={`flex-1 py-3 lg:py-2 text-[10px] md:text-xs font-bold rounded ${tone === "radical" ? "bg-rose-600 text-white" : "text-slate-500 hover:text-slate-300"}`}
                  onClick={() => setTone("radical")}
                >
                  Radical
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 bg-slate-900/50 border-t border-slate-700 shrink-0">
          <button
            onClick={handlePublish}
            className="w-full bg-indigo-600 text-white font-black text-base md:text-lg py-4 md:py-4 rounded-xl shadow-lg hover:bg-indigo-500 transition-all active:scale-95"
          >
            PUBLIER LE CONTENU
          </button>
        </div>
      </div>
      <div className="xl:col-span-6 flex flex-col gap-6">
        <div className="flex-1 min-h-[350px] xl:min-h-0">
          <SimulationChart data={postHistory} />
        </div>
      </div>
    </div>
  );
};
