import { useEffect, useRef } from "react";
import { useChatStore } from "../stores/useChatStore";
import { motion } from "framer-motion"; // Implémentation du feeling Gaming UI

export const ChatTerminal = () => {
  const messages = useChatStore((state) => state.messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll à chaque nouveau message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "toxic":
        return "text-[#ff003c] font-bold";
      case "supporter":
        return "text-[#00ff41]";
      case "system":
        return "text-yellow-500 italic text-xs uppercase";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-2 p-2 scrollbar-hide relative">
      {messages.map((msg) => (
        // Framer Motion crée l'effet d'apparition instantanée typique des chats Twitch
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className={`text-sm break-words leading-tight ${getTypeStyle(msg.type)}`}
        >
          {msg.user !== "SYSTEM" && (
            <span className="opacity-50 mr-2 font-bold">[{msg.user}]</span>
          )}
          {msg.text}
        </motion.div>
      ))}
      {/* Une ancre invisible à la fin de la liste pour forcer le scroll */}
      <div ref={bottomRef} />
    </div>
  );
};
