export type Camp = "extreme_gauche" | "gauche" | "centre" | "droite" | "extreme_droite";
export type Theme = "immigration" | "ecologie" | "guerre" | "science";
export type Format = "court" | "long";
export type Tone = "nuance" | "radical";
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