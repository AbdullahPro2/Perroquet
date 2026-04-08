import { useState } from "react";
import { useGameStore } from "../stores/useGameStore";
import type { CampPolitical, PlatformId } from "../types/game";

export const SetupPage = () => {
  const setupIdentity = useGameStore((state) => state.setupIdentity);
  const [camp, setCamp] = useState<CampPolitical | null>(null);
  const [platform, setPlatform] = useState<PlatformId | null>(null);

  return (
    <div className="h-screen w-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-black text-slate-800 text-center mb-2">
          Algorithm Architect
        </h1>
        <p className="text-slate-500 text-center mb-8">
          Choisissez votre arène et vos convictions.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
              1. Votre Ligne Politique
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {(
                ["gauche", "droite", "centre", "extreme"] as CampPolitical[]
              ).map((c) => (
                <button
                  key={c}
                  onClick={() => setCamp(c)}
                  className={`p-3 rounded-xl border-2 font-bold capitalize transition-all ${camp === c ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
              2. La Plateforme Cible
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPlatform("xsphere")}
                className={`p-4 rounded-xl border-2 text-left transition-all ${platform === "xsphere" ? "border-indigo-600 bg-indigo-50" : "border-slate-200"}`}
              >
                <h3
                  className={`font-black ${platform === "xsphere" ? "text-indigo-700" : "text-slate-800"}`}
                >
                  X-Sphere
                </h3>
              </button>
              <button
                onClick={() => setPlatform("vidtube")}
                className={`p-4 rounded-xl border-2 text-left transition-all ${platform === "vidtube" ? "border-indigo-600 bg-indigo-50" : "border-slate-200"}`}
              >
                <h3
                  className={`font-black ${platform === "vidtube" ? "text-indigo-700" : "text-slate-800"}`}
                >
                  VidTube
                </h3>
              </button>
            </div>
          </div>

          <button
            disabled={!camp || !platform}
            onClick={() => camp && platform && setupIdentity(camp, platform)}
            className="w-full mt-4 bg-indigo-600 disabled:bg-slate-300 text-white font-black py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all"
          >
            CRÉER MON COMPTE
          </button>
        </div>
      </div>
    </div>
  );
};
