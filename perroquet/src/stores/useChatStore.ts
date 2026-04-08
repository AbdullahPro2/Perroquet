import { create } from "zustand";

export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  type: "neutral" | "toxic" | "supporter" | "system";
}

interface ChatState {
  messages: ChatMessage[];
  addMessage: (msg: Omit<ChatMessage, "id">) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (msg) =>
    set((state) => {
      // On garde uniquement les 50 derniers messages pour la performance
      const newMessages = [
        ...state.messages,
        { ...msg, id: crypto.randomUUID() },
      ];
      if (newMessages.length > 50) newMessages.shift();
      return { messages: newMessages };
    }),
  clearChat: () => set({ messages: [] }),
}));
