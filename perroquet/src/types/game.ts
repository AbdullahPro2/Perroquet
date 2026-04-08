// src/types/game.ts
export type CampPolitical = "gauche" | "droite" | "centre" | "extreme";
export type Theme = "ecologie" | "economie" | "securite" | "social";
export type PlatformId = "xsphere" | "vidtube";

export interface PlatformConfig {
  id: PlatformId;
  name: string;
  description: string;
  bias: {
    formatShort: number;
    toneRadical: number;
    metaAlignment: number;
  };
}

export interface ContentSliders {
  theme: Theme;
  format: number;
  tone: number;
  alignment: number;
}
