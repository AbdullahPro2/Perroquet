export type Camp = "extreme_gauche" | "gauche" | "centre" | "droite" | "extreme_droite";
export type Theme = "immigration" | "ecologie" | "guerre" | "science";
export type Format = "court" | "long";
export type Tone = "nuance" | "radical";

// On garde uniquement nos deux plateformes
export type PlatformId = "xsphere" | "vidtube";

// La structure des biais algorithmiques
export interface PlatformConfig {
  id: PlatformId;
  name: string;
  description: string;
  bias: {
    formatCourt: number;   // Points gagnés/perdus pour un format snackable
    formatLong: number;    // Points gagnés/perdus pour un format long/sourcé
    tonRadical: number;    // Points gagnés/perdus pour le clash
    tonNuance: number;     // Points gagnés/perdus pour la pédagogie
    tendanceBoost: number; // Multiplicateur si on parle du sujet tendance
  };
}