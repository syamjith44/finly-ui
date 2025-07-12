import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HolographicInput } from "./holographic-input";
import { HolographicButton } from "./holographic-button";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import { PaperPlaneIcon, PersonIcon } from "@radix-ui/react-icons";
import { Bot } from "lucide-react";

export function AIChat() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ["/api/chat", user?.id],
    enabled: !!user?.id,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (msg: string) => api.chat.sendMessage(user!.id, msg),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat", user?.id] });
      setMessage("");
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && user) {
      sendMessageMutation.mutate(message.trim());
    }
  };

  // Format messages for display
  const chatMessages = messages.flatMap((msg: any) => {
    const result = [
      {
        id: `${msg.id}-user`,
        text: msg.message,
        isUser: true,
        createdAt: msg.createdAt
      }
    ];
    
    if (msg.response) {
      result.push({
        id: `${msg.id}-ai`,
        text: msg.response,
        isUser: false,
        createdAt: msg.createdAt
      });
    }
    
    return result;
  });

  return (
    <div className="holographic-border p-6 rounded-xl glow-effect">
      <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center">
        <Bot className="mr-2" />
        AI Financial Assistant
      </h3>
      
      {/* Chat Messages */}
      <div className="bg-gray-900/50 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
        <div className="space-y-4">
          {chatMessages.length === 0 ? (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-gray-700 rounded-lg px-4 py-2 max-w-xs">
                <p className="text-sm">
                  Hello! I'm your AI financial assistant. You can tell me about your income, expenses, or debts, and I'll help analyze your financial situation.
                </p>
              </div>
            </div>
          ) : (
            chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${
                  msg.isUser ? "justify-end" : ""
                }`}
              >
                {!msg.isUser && (
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-2 max-w-xs ${
                    msg.isUser
                      ? "bg-blue-400 text-black"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                {msg.isUser && (
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <PersonIcon className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <HolographicInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your financial situation..."
          className="flex-1"
          disabled={sendMessageMutation.isPending}
        />
        <HolographicButton
          type="submit"
          disabled={!message.trim() || sendMessageMutation.isPending}
          className="px-4"
        >
          <PaperPlaneIcon className="w-4 h-4" />
        </HolographicButton>
      </form>
    </div>
  );
}
