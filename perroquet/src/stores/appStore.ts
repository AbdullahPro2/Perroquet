import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Theme, PlatformId } from "../types/game";

interface GameState {
  sidebarOpen: boolean;
  theme: "light" | "dark";
  platform: PlatformId | null;
  audience: number;
  capital: number;
  mentalHealth: number;
  currentTrend: Theme;
  hasTrendAnalyzer: boolean;

  // NOUVEAU : La mémoire du jeu pour tracer le graphique
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
    // NOUVEAU : La fonction complète de publication
    publishContent: (
      themeChoice: Theme,
      format: number,
      tone: number,
      alignment: number,
    ) => { feedback: string };
  };
}

const ALL_THEMES: Theme[] = ["ecologie", "economie", "securite", "social"];

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
        currentTrend: ALL_THEMES[Math.floor(Math.random() * ALL_THEMES.length)],
        hasTrendAnalyzer: false,

        postCount: 0,
        postHistory: [
          { id: "0", postCount: 0, audience: 100, mentalHealth: 100 },
        ], // Point de départ

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

          publishContent: (themeChoice, format, tone, alignment) => {
            const state = get();
            let feedback = "";

            // 1. Mathématiques de l'algorithme (Exemple X-Sphere : format court et ton radical récompensés)
            const isTrending = themeChoice === state.currentTrend;
            const trendMultiplier = isTrending ? 2.5 : 1.0;

            // Calculs simplifiés pour l'exemple
            const formatScore = (format / 100) * 2.5;
            const toneScore = (tone / 100) * 3.0;
            const metaScore = (alignment / 100) * 1.5 * trendMultiplier;

            const viralityFactor = formatScore + toneScore + metaScore;

            const audienceGain = Math.floor(
              10 * viralityFactor * (Math.random() * 0.5 + 0.8),
            );
            const capitalGain = Math.floor(5 * viralityFactor);

            // 2. Le prix à payer (Santé mentale)
            const selloutPenalty = alignment > 50 ? (alignment - 50) / 5 : 0;
            const radicalPenalty = tone > 70 ? (tone - 70) / 4 : 0;
            const healthLoss = Math.floor(selloutPenalty + radicalPenalty);

            // 3. Génération du feedback texte
            if (isTrending && tone > 80)
              feedback =
                "🔥 SURF SUR LA TENDANCE : Algorithme saturé. Explosion des vues.";
            else if (!isTrending && format < 20)
              feedback = "📉 HORS-SUJET : Un sujet de fond ignoré par l'algo.";
            else feedback = "📊 PUBLICATION STANDARD.";

            // 4. Mise à jour de l'état
            set((draft) => {
              draft.audience += audienceGain;
              draft.capital += capitalGain;
              draft.mentalHealth = Math.max(0, draft.mentalHealth - healthLoss);
              draft.postCount += 1;

              // On ajoute ce tour à l'historique pour le graphique
              draft.postHistory.push({
                id: crypto.randomUUID(),
                postCount: draft.postCount,
                audience: draft.audience,
                mentalHealth: draft.mentalHealth,
              });

              // Rotation de la tendance (30% de chance de changer)
              if (Math.random() > 0.7) {
                const otherThemes = ALL_THEMES.filter(
                  (t) => t !== draft.currentTrend,
                );
                draft.currentTrend =
                  otherThemes[Math.floor(Math.random() * otherThemes.length)];
              }
            });

            return { feedback };
          },
        },
      })),
      { name: "perroquet-game" },
    ),
  ),
);
