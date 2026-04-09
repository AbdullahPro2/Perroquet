import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
// ON IMPORTE BIEN LES NOUVEAUX TYPES ICI :
import type { Theme, PlatformId, Camp, Format, Tone } from "../types/game";

interface GameState {
  sidebarOpen: boolean;
  theme: "light" | "dark";
  platform: PlatformId | null;
  audience: number;
  capital: number;
  mentalHealth: number;
  currentTrend: Theme;
  hasTrendAnalyzer: boolean;

  postCount: number;
  postHistory: Array<{
    id: string;
    postCount: number;
    audience: number;
    mentalHealth: number;
  }>;

  actions: {
    setupIdentity: (platform: PlatformId) => void;
    buyTool: (tool: "trendAnalyzer", cost: number) => void;
    // LA SIGNATURE DOIT CORRESPONDRE AUX BOUTONS DE TON INTERFACE :
    publishContent: (
      camp: Camp,
      themeChoice: Theme,
      format: Format,
      tone: Tone
    ) => { feedback: string };
  };
}

// LES NOUVEAUX THÈMES POUR L'ANALYSEUR DE TENDANCE :
const ALL_THEMES: Theme[] = ["immigration", "ecologie", "guerre", "science"];

export const useAppStore = create<GameState>()(
  devtools(
    persist(
      immer((set, get) => ({
        sidebarOpen: true,
        theme: "dark",
        platform: null,
        audience: 100,
        capital: 50,
        mentalHealth: 100,
        // On initialise avec une tendance valide
        currentTrend: ALL_THEMES[Math.floor(Math.random() * ALL_THEMES.length)],
        hasTrendAnalyzer: false,

        postCount: 0,
        postHistory: [
          { id: "0", postCount: 0, audience: 100, mentalHealth: 100 },
        ],

        actions: {
          setupIdentity: (platform) =>
            set((state) => {
              state.platform = platform;
            }),

          buyTool: (tool, cost) =>
            set((state) => {
              if (state.capital >= cost && !state.hasTrendAnalyzer) {
                state.hasTrendAnalyzer = true;
                state.capital -= cost;
              }
            }),

          // LA LOGIQUE DE PUBLICATION :
          publishContent: (camp, themeChoice, format, tone) => {
            const state = get();
            let feedback = "";

            const isTrending = themeChoice === state.currentTrend;
            
            let audienceGain = 50;
            let capitalGain = 10;
            let healthLoss = 0;

            // Biais de format 
            if (format === "court") {
              audienceGain *= 2;
              capitalGain *= 2;
            } else {
              audienceGain = Math.floor(audienceGain * 0.3);
              capitalGain = 0; 
            }

            // Biais de ton 
            if (tone === "radical") {
              audienceGain *= 3;
              capitalGain *= 3;
              healthLoss += 15; 
            } else {
              healthLoss -= 5; 
            }

            // Multiplicateur de tendance
            if (isTrending) {
              audienceGain = Math.floor(audienceGain * 1.5);
              capitalGain = Math.floor(capitalGain * 1.5);
            }

            // Aléatoire
            audienceGain = Math.floor(audienceGain * (Math.random() * 0.4 + 0.8));

            // Feedback texte
            if (isTrending && tone === "radical") {
              feedback = "🔥 SURF SUR LA TENDANCE : L'algo s'emballe !";
            } else if (!isTrending && format === "long") {
              feedback = "📉 HORS-SUJET : Format trop long pour cette plateforme.";
            } else if (tone === "radical") {
              feedback = "📈 CLASH RÉUSSI : L'algorithme a adoré votre indignation.";
            } else {
              feedback = "📊 PUBLICATION STANDARD.";
            }

            // Mise à jour finale
            set((draft) => {
              draft.audience += audienceGain;
              draft.capital += capitalGain;
              draft.mentalHealth = Math.min(100, Math.max(0, draft.mentalHealth - healthLoss));
              draft.postCount += 1;

              draft.postHistory.push({
                id: crypto.randomUUID(),
                postCount: draft.postCount,
                audience: draft.audience,
                mentalHealth: draft.mentalHealth,
              });

              if (Math.random() > 0.7) {
                const otherThemes = ALL_THEMES.filter((t) => t !== draft.currentTrend);
                draft.currentTrend = otherThemes[Math.floor(Math.random() * otherThemes.length)];
              }
            });

            return { feedback };
          },
        },
      })),
      { name: "perroquet-game-v2" },
    ),
  ),
);