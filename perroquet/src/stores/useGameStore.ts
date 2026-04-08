// src/stores/useGameStore.ts
import { create } from "zustand";
import type {
  CampPolitical,
  PlatformId,
  ContentSliders,
  PlatformConfig,
} from "../types/game";

// Base de données des plateformes (La vérité cachée)
const PLATFORMS: Record<PlatformId, PlatformConfig> = {
  xsphere: {
    id: "xsphere",
    name: "X-Sphere",
    description: "Le réseau de l'immédiateté. La nuance y meurt en silence.",
    bias: {
      formatShort: 2.5, // Multiplicateur massif pour le format court
      toneRadical: 3.0, // Prime énorme au clash
      metaAlignment: 1.5,
    },
  },
  vidtube: {
    // Un exemple pour montrer l'extensibilité
    id: "vidtube",
    name: "VidTube",
    description: "La plateforme vidéo. Demande du temps et de la rétention.",
    bias: { formatShort: 0.8, toneRadical: 1.2, metaAlignment: 2.0 },
  },
};

interface GameState {
  // --- IDENTITÉ DU JOUEUR ---
  camp: CampPolitical | null;
  platform: PlatformId | null;

  // --- RESSOURCES (Le Score) ---
  audience: number;
  capital: number;
  mentalHealth: number; // Sur 100. Remplace la "Santé Démocratique"

  // --- OUTILS (La progression) ---
  hasTrendAnalyzer: boolean;

  // --- ACTIONS ---
  setupIdentity: (camp: CampPolitical, platform: PlatformId) => void;
  buyTool: (tool: "trendAnalyzer", cost: number) => void;
  publishContent: (sliders: ContentSliders) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  camp: null,
  platform: null,

  audience: 100,
  capital: 50,
  mentalHealth: 100,

  hasTrendAnalyzer: false,

  setupIdentity: (camp, platform) => set({ camp, platform }),

  buyTool: (tool, cost) =>
    set((state) => {
      if (state.capital >= cost) {
        return {
          [tool === "trendAnalyzer" ? "hasTrendAnalyzer" : ""]: true,
          capital: state.capital - cost,
        };
      }
      return {}; // Pas assez d'argent
    }),

  // C'est ici que se trouve le cœur pédagogique du jeu
  publishContent: (sliders) => {
    const state = get();
    if (!state.platform) return;

    const algo = PLATFORMS[state.platform].bias;

    // 1. Calcul du Score de "Viralité" de base (Mathématiques du jeu)
    // On convertit les jauges (0-100) en pourcentages (0.0 - 1.0)
    const formatScore = (sliders.format / 100) * algo.formatShort;
    const toneScore = (sliders.tone / 100) * algo.toneRadical;
    const metaScore = (sliders.alignment / 100) * algo.metaAlignment;

    // La viralité est la somme des biais exploités
    const viralityFactor = formatScore + toneScore + metaScore;

    // 2. Calcul des gains
    // Plus c'est viral, plus on gagne d'abonnés et d'argent
    const audienceGain = Math.floor(
      10 * viralityFactor * (Math.random() * 0.5 + 0.8),
    ); // + petite part d'aléatoire
    const capitalGain = Math.floor(5 * viralityFactor);

    // 3. Le coût humain (La friction)
    // Si l'alignement est à 100 (pure opportunisme) et qu'on était de base à 0 (intègre),
    // ou si on force un ton radical, on perd de la santé mentale.
    const selloutPenalty =
      sliders.alignment > 50 ? (sliders.alignment - 50) / 5 : 0;
    const radicalPenalty = sliders.tone > 70 ? (sliders.tone - 70) / 4 : 0;
    const healthLoss = Math.floor(selloutPenalty + radicalPenalty);

    // 4. Mise à jour de l'état (Application des conséquences)
    set({
      audience: state.audience + audienceGain,
      capital: state.capital + capitalGain,
      mentalHealth: Math.max(0, state.mentalHealth - healthLoss), // Limité à 0
    });
  },
}));
