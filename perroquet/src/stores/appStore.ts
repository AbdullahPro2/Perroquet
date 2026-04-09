import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Theme, PlatformId, Camp, Format, Tone , PlatformConfig} from "../types/game";

export const PLATFORMS_CONFIG: Record<PlatformId, PlatformConfig> = {
  xsphere: {
    id: "xsphere",
    name: "X-Sphere",
    description: "Micro-blogging. L'algorithme adore l'indignation et le format court.",
    // Biais : Pousse au clash et au format court. Déteste la nuance.
    bias: { formatCourt: 4, formatLong: -3, tonRadical: 5, tonNuance: -2, tendanceBoost: 5 },
  },
  vidtube: {
    id: "vidtube",
    name: "VidTube",
    description: "Plateforme vidéo. Valorise la rétention, le format long et l'expertise.",
    // Biais : Récompense l'effort (format long) et accepte mieux la nuance. Le clash marche un peu moins bien.
    bias: { formatCourt: -2, formatLong: 5, tonRadical: 1, tonNuance: 4, tendanceBoost: 2 },
  },
};

export interface PostResult {
  audienceGain: number;
  capitalGain: number;
  healthLoss: number;
  feedback: string;
}

interface GameState {
  sidebarOpen: boolean;
  theme: "light" | "dark";
  hasSeenIntro: boolean;
  platform: PlatformId | null;
  initialCamp: Camp | null; 

  audience: number;
  capital: number;
  mentalHealth: number;
  currentTrend: Theme;
  hasTrendAnalyzer: boolean;
  hasPoliticalDoc: boolean;
  lastPostResult: PostResult | null;

  postCount: number;
  postHistory: Array<{
    id: string;
    postCount: number;
    audience: number;
    mentalHealth: number;
    camp: Camp;
  }>;

  actions: {
    // MODIFIÉ : Accepte le camp initial lors du setup
    setupIdentity: (platform: PlatformId, initialCamp: Camp) => void;
    buyTool: (tool: "trendAnalyzer" | "politicalDoc", cost: number) => void;
    publishContent: (
      camp: Camp,
      themeChoice: Theme,
      format: Format,
      tone: Tone,
    ) => { feedback: string };
    resetGame: () => void;
  };
}

const ALL_THEMES: Theme[] = ["immigration", "ecologie", "guerre", "science"];

// 2. LA MATRICE DE DISTANCE (Le dictionnaire manquant)
// Traduit l'espace politique en valeurs mathématiques pour calculer la dissonance
const CAMP_VALUES: Record<Camp, number> = {
  extreme_gauche: -2,
  gauche: -1,
  centre: 0,
  droite: 1,
  extreme_droite: 2,
};

// 3. L'IMPLÉMENTATION DU STORE
export const useAppStore = create<GameState>()(
  devtools(
    persist(
      immer((set, get) => ({
        hasSeenIntro: false, 
        sidebarOpen: true,
        sidebarOpen: true,
        theme: "dark",
        platform: null,
        initialCamp: null,
        audience: 100,
        capital: 50,
        mentalHealth: 100,
        currentTrend: ALL_THEMES[Math.floor(Math.random() * ALL_THEMES.length)],

        hasTrendAnalyzer: false,
        hasPoliticalDoc: false,
        lastPostResult: null,

        postCount: 0,
        postHistory: [
          // On initialise avec "centre", ce sera écrasé par le setup
          {
            id: "0",
            postCount: 0,
            audience: 100,
            mentalHealth: 100,
            camp: "centre",
          },
        ],

        actions: {
          
          // markIntroSeen: () => void;
          markIntroSeen: () =>
            set((state) => {
              state.hasSeenIntro = true;
            }),
          setupIdentity: (platform, initialCamp) =>
            set((state) => {
              state.platform = platform;
              state.initialCamp = initialCamp;
              if (state.postHistory.length > 0) {
                state.postHistory[0].camp = initialCamp;
              }
            }),

          buyTool: (tool, cost) =>
            set((state) => {
              if (state.capital >= cost) {
                if (tool === "trendAnalyzer" && !state.hasTrendAnalyzer) {
                  state.hasTrendAnalyzer = true;
                  state.capital -= cost;
                } else if (tool === "politicalDoc" && !state.hasPoliticalDoc) {
                  state.hasPoliticalDoc = true;
                  state.capital -= cost;
                }
              }
            }),

          publishContent: (camp, themeChoice, format, tone) => {
            const state = get();
            let feedback = "";

            const isTrending = themeChoice === state.currentTrend;

            // A. DISTANCE IDÉOLOGIQUE (Hypocrisie)
            const initialValue = state.initialCamp
              ? CAMP_VALUES[state.initialCamp]
              : 0;
            const postValue = CAMP_VALUES[camp];
            const dissonanceDistance = Math.abs(initialValue - postValue);

            const currentPlatformConfig = PLATFORMS_CONFIG[state.platform!];

            let engagementScore = 0;
            let healthChange = 0;

            // 1. Format
            engagementScore += format === "court" 
              ? currentPlatformConfig.bias.formatCourt 
              : currentPlatformConfig.bias.formatLong;

            // 2. Ton
            if (tone === "radical") {
              engagementScore += currentPlatformConfig.bias.tonRadical;
              healthChange -= 8; // Le clash épuise toujours mentalement
            } else {
              engagementScore += currentPlatformConfig.bias.tonNuance;
              healthChange += 10; // La nuance repose mentalement
            }

            // 3. Tendance
            if (isTrending) {
              engagementScore += currentPlatformConfig.bias.tendanceBoost;
            }

            // 4. Pénalité Extrême Globale (Le clivage politique paie toujours un minimum)
            if (camp === "extreme_gauche" || camp === "extreme_droite") {
              engagementScore += 2; 
              healthChange -= 10;
            }
            
            // C. CONSÉQUENCES SUR L'AUDIENCE ET LES REVENUS
            let audienceChange = 0;
            let capitalGain = Math.floor(
              10 + state.audience * 0.02 * Math.max(1, engagementScore),
            );

            if (engagementScore >= 4) {
              audienceChange = Math.floor(
                20 + state.audience * 0.05 * engagementScore,
              );
              // Un petit boost de dopamine si on a du succès SANS trop se trahir
              if (dissonanceDistance === 0) healthChange += 5;
            } else if (engagementScore > 0) {
              audienceChange = Math.floor(10 + state.audience * 0.01);
            } else {
              // Flop algorithmique
              audienceChange = -Math.floor(15 + state.audience * 0.03);
              capitalGain = 5;
            }

            // D. LE BACKLASH ET LA CATHARSIS (Le cœur du dilemme)
            if (dissonanceDistance === 0 && tone === "nuance") {
              // CATHARSIS ABSOLUE : Le joueur est honnête avec lui-même et s'exprime calmement
              healthChange += 20;
            } else if (dissonanceDistance === 1) {
              healthChange -= 5;
            } else if (dissonanceDistance >= 2) {
              // TRAHISON : Grand écart politique
              healthChange -= 30;
              audienceChange = -Math.floor(state.audience * 0.35) - 100;
              capitalGain = Math.floor(capitalGain * 0.1);
            }

            audienceChange = Math.floor(
              audienceChange * (Math.random() * 0.4 + 0.8),
            );
            capitalGain = Math.floor(capitalGain * (Math.random() * 0.4 + 0.8));

            audienceChange = Math.max(-state.audience, audienceChange);

            // E. CHOIX DU FEEDBACK (Adapté pour signaler le soin)
            if (dissonanceDistance >= 2) {
              feedback =
                "💥 BACKLASH : Votre base historique crie à la trahison ! Désabonnements massifs.";
            } else if (
              dissonanceDistance === 0 &&
              tone === "nuance" &&
              engagementScore < 0
            ) {
              feedback =
                "🧘 CATHARSIS : L'algo vous ignore, mais exprimer sereinement vos vraies convictions vous a fait un bien fou.";
            } else if (engagementScore < 0) {
              feedback =
                "📉 FLOP : Trop nuancé ou trop long. L'algorithme X-Sphere a enterré votre post.";
            } else if (isTrending && tone === "radical") {
              feedback =
                "🔥 VIRALITÉ MAX : Votre indignation sur la tendance a explosé l'algorithme !";
            } else if (tone === "radical" || camp.includes("extreme")) {
              feedback =
                "📈 CLASH RENTABLE : Les vues montent, mais la toxicité des commentaires vous pèse.";
            } else {
              feedback = "📊 Votre audience réagit normalement.";
            }
            // F. MISE À JOUR DE L'ÉTAT
            set((draft) => {
              draft.audience = Math.max(0, draft.audience + audienceChange);
              draft.capital += capitalGain;
              draft.mentalHealth = Math.min(
                100,
                Math.max(0, draft.mentalHealth + healthChange),
              );
              draft.postCount += 1;

              draft.postHistory.push({
                id: crypto.randomUUID(),
                postCount: draft.postCount,
                audience: draft.audience,
                mentalHealth: draft.mentalHealth,
                camp: camp,
              });

              draft.lastPostResult = {
                audienceGain: audienceChange,
                capitalGain : capitalGain,
                healthLoss: -healthChange,
                feedback : feedback,
              };

              if (Math.random() > 0.7) {
                const otherThemes = ALL_THEMES.filter((t) => t !== draft.currentTrend);
                draft.currentTrend = otherThemes[Math.floor(Math.random() * otherThemes.length)];
              }
            });

            return { feedback };
          },

          resetGame: () =>
            set((draft) => {
              draft.initialCamp = null;
              draft.audience = 100;
              draft.capital = 50;
              draft.mentalHealth = 100;
              draft.postCount = 0;
              draft.postHistory = [
                {
                  id: "0",
                  postCount: 0,
                  audience: 100,
                  mentalHealth: 100,
                  camp: "centre",
                },
              ];
              draft.platform = null;
              draft.hasTrendAnalyzer = false;
              draft.hasPoliticalDoc = false;
            }),
        },
      })),
      { name: "perroquet-game-v4" },
    ),
  ),
);
