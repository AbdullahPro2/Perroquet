import { useEffect } from "react";
import { useGameStore } from "../stores/useGameStore";
import { useChatStore } from "../stores/useChatStore";
import { generateChatMessage } from "../stores/chatEngine";

const TICK_RATE_MS = 2000; // Le jeu "réfléchit" toutes les 2 secondes

export const useGameLoop = () => {
  // On s'abonne uniquement à 'isStreaming' pour déclencher/arrêter la boucle
  const isStreaming = useGameStore((state) => state.isStreaming);

  useEffect(() => {
    if (!isStreaming) return;

    // Message système au lancement
    useChatStore.getState().addMessage({
      user: "SYSTEM",
      text: "Flux démarré. Les algorithmes analysent votre contenu...",
      type: "system",
    });

    const gameInterval = setInterval(() => {
      // 1. LECTURE SILENCIEUSE (Pas de re-rendu du composant contenant le hook)
      const state = useGameStore.getState();

      // 2. ÉVOLUTION SYSTÉMIQUE NATURELLE
      // Ex: L'audience monte doucement, mais plus vite si la polarisation est haute
      const audienceGrowth = state.polarization > 50 ? 5 : 1;

      useGameStore.getState().applyDecisionImpact({
        audience: audienceGrowth,
      });

      // 3. GÉNÉRATION DU CHAT
      const newMsg = generateChatMessage(state.ideology, state.polarization);
      useChatStore.getState().addMessage(newMsg);
    }, TICK_RATE_MS);

    return () => {
      clearInterval(gameInterval);
      useChatStore.getState().addMessage({
        user: "SYSTEM",
        text: "Flux interrompu.",
        type: "system",
      });
    };
  }, [isStreaming]); // La boucle se recrée uniquement si on allume/éteint le stream
};
