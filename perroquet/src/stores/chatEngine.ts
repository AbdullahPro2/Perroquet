// Un dictionnaire simple pour simuler la base de données narrative
const DICTIONARY = {
  neutral: [
    "Salut le chat !",
    "Il commence à quelle heure le vrai sujet ?",
    "Lurker ici 👀",
  ],
  gauche: {
    base: [
      "Total soutien !",
      "Faut taxer plus les riches.",
      "L'écologie avant tout.",
    ],
    toxic: [
      "Les bourgeois au goulag !",
      "Cancel ce facho !",
      "Vous êtes tous des vendus.",
    ],
  },
  droite: {
    base: [
      "Moins d'impôts, plus de liberté.",
      "L'ordre c'est la base.",
      "C'était mieux avant.",
    ],
    toxic: [
      "Les wokes détruisent tout.",
      "Fermez les frontières !",
      "Gauchistes de m*rde.",
    ],
  },
};

const USERNAMES = [
  "DarkSasuke99",
  "Politi_Cat",
  "TruthSeeker",
  "JeanMi_du_13",
  "EcoWarrior",
];

// La fonction d'injection algorithmique
export const generateChatMessage = (
  ideology: "gauche" | "droite" | "centre" | null,
  polarization: number,
) => {
  const randomUser = USERNAMES[Math.floor(Math.random() * USERNAMES.length)];

  // Si le joueur n'a pas d'idéologie ou est au centre, le chat s'ennuie
  if (!ideology || ideology === "centre") {
    const text =
      DICTIONARY.neutral[Math.floor(Math.random() * DICTIONARY.neutral.length)];
    return { user: randomUser, text, type: "neutral" as const };
  }

  // La polarisation agit comme un "jet de dés" de probabilité
  // Si Polarisation = 80, on a 80% de chance de générer un message toxique
  const isToxic = Math.random() * 100 < polarization;

  const pool = isToxic ? DICTIONARY[ideology].toxic : DICTIONARY[ideology].base;
  const text = pool[Math.floor(Math.random() * pool.length)];

  return {
    user: randomUser,
    text,
    type: isToxic ? "toxic" : ("supporter" as const),
  };
};
