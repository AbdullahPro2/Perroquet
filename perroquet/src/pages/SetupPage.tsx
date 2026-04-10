import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore, PLATFORMS_CONFIG } from "../stores/appStore";
import type { Camp, PlatformId } from "../types/game";

export const SetupPage = () => {
  const setupIdentity = useAppStore((state) => state.actions.setupIdentity);
  const [camp, setCamp] = useState<Camp | null>(null);
  const [platform, setPlatform] = useState<PlatformId | null>(null);
  const navigate = useNavigate();

  const handleStart = () => {
    if (camp && platform) {
      setupIdentity(platform, camp);
      navigate("/");
    }
  };

  const INITIAL_CAMPS: { id: Camp; label: string }[] = [
    { id: "gauche", label: "Gauche Modérée" },
    { id: "centre", label: "Centre Libéral" },
    { id: "droite", label: "Droite Modérée" },
  ];

  return (
    //  min-h-[100dvh] permet de scroller si l'écran du téléphone est très petit
    <div className="min-h-[100dvh] w-full bg-slate-900 flex items-center justify-center p-4 py-8 md:py-4">
      {/* Padding interne réduit sur mobile (p-5 au lieu de p-8) */}
      <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-8 max-w-2xl w-full">
        {/* Typographie légèrement ajustée pour les petits écrans */}
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 text-center mb-2">
          Perroquet
        </h1>
        <p className="text-sm md:text-base text-slate-500 text-center mb-6 md:mb-8">
          Choisissez vos convictions intimes et votre arène de départ.
        </p>

        <div className="space-y-6">
          {/* SECTION 1 : CONVICTIONS */}
          <div>
            <h2 className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
              1. Vos convictions profondes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
              {INITIAL_CAMPS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCamp(c.id)}
                  // py-3.5 sur mobile pour des boutons plus hauts (plus faciles à toucher)
                  className={`px-3 py-3.5 md:py-3 rounded-xl border-2 font-bold text-sm md:text-base transition-all ${
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
            <h2 className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
              2. La Plateforme Cible
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
              {Object.values(PLATFORMS_CONFIG).map((p) => {
                // On vérifie si la plateforme est VidTube
                const isDisabled = p.id === "vidtube";

                return (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    disabled={isDisabled} // Empêche le clic
                    // espacements internes revus pour mobile et ajout du style "désactivé"
                    className={`p-4 md:p-5 rounded-xl border-2 text-left transition-all relative ${
                      isDisabled
                        ? "border-slate-300 bg-slate-100 cursor-not-allowed opacity-60"
                        : platform === p.id
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <h3
                      className={`font-black text-base md:text-lg ${
                        isDisabled
                          ? "text-slate-500"
                          : platform === p.id
                          ? "text-indigo-700"
                          : "text-slate-800"
                      }`}
                    >
                      {p.name}
                    </h3>
                    <p className="text-[11px] md:text-xs text-slate-500 mt-1 leading-snug">
                      {p.description}
                    </p>
                    
                    {/* Petit badge explicatif (optionnel, mais bien pour l'UI) */}
                    {isDisabled && (
                      <div className="mt-3 inline-block bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        🔒 Bientôt disponible
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* BOUTON DE VALIDATION */}
          <button
            disabled={!camp || !platform}
            onClick={handleStart}
            // shadow optimisé
            className="w-full mt-2 md:mt-4 bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
          >
            LANCER MON COMPTE
          </button>
        </div>
      </div>
    </div>
  );
};
