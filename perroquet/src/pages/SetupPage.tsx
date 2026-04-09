import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore, PLATFORMS_CONFIG } from "../stores/appStore";
// On utilise le type "Camp" que l'on a mis à jour précédemment
import type { Camp, PlatformId } from "../types/game";

export const SetupPage = () => {
  const setupIdentity = useAppStore((state) => state.actions.setupIdentity);
  const [camp, setCamp] = useState<Camp | null>(null);
  const [platform, setPlatform] = useState<PlatformId | null>(null);
  const navigate = useNavigate();

  // Modifiez l'appel à la fonction pour transmettre le camp initial au Store
  const handleStart = () => {
    if (camp && platform) {
      setupIdentity(platform, camp);
      navigate("/");
    }
  };

  // On redéfinit les choix initiaux pour empêcher le joueur de commencer "Extrême"
  // et ainsi forcer le dilemme moral par la suite.
  const INITIAL_CAMPS: { id: Camp; label: string }[] = [
    { id: "gauche", label: "Gauche Modérée" },
    { id: "centre", label: "Centre Libéral" },
    { id: "droite", label: "Droite Modérée" },
  ];

  return (
    <div className="h-screen w-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-black text-slate-800 text-center mb-2">
          Perroquet
        </h1>
        <p className="text-slate-500 text-center mb-8">
          Choisissez vos convictions intimes et votre arène de départ.
        </p>

        <div className="space-y-6">
          {/* SECTION 1 : CONVICTIONS */}
          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
              1. Vos convictions profondes
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {INITIAL_CAMPS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCamp(c.id)}
                  className={`p-3 rounded-xl border-2 font-bold transition-all ${
                    camp === c.id
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 2 : PLATEFORME */}
          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
              2. La Plateforme Cible
            </h2>
            <div className="grid grid-cols-2 gap-3">
              
              {/* On génère les boutons automatiquement avec nos DEUX plateformes */}
              {Object.values(PLATFORMS_CONFIG).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    platform === p.id
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <h3
                    className={`font-black ${platform === p.id ? "text-indigo-700" : "text-slate-800"}`}
                  >
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {p.description}
                  </p>
                </button>
              ))}

            </div>
          </div>

          {/* BOUTON DE VALIDATION */}
          <button
            disabled={!camp || !platform}
            onClick={handleStart}
            className="w-full mt-4 bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
          >
            LANCER MON COMPTE
          </button>
        </div>
      </div>
    </div>
  );
};
