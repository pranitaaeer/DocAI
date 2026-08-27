"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState, useRef } from "react";
import { useChatStore } from "@/store/chatStore";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const params = useParams();
  const router = useRouter();
  const chatId = params?.chatId as string;

  // Auto-scroll reference
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const user = useAuthStore((state) => state.user);
  const fetchMe = useAuthStore((state) => state.fetchMe);

  const {
    chats,
    currentChat,
    messages,
    fetchChats,
    fetchChat,
    send,
    isSending,
  } = useChatStore();

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Trigger scroll whenever messages change or AI is thinking
  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  // 1. Initial Data Fetch (User, All Chats, and Current Chat)
  useEffect(() => {
    fetchMe();
    fetchChats();
    if (chatId) {
      fetchChat(chatId);
    }
  }, [chatId, fetchMe, fetchChats, fetchChat]);

  // 2. Handle Message Send
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim() || isSending) return;

    const textToSend = message;
    setMessage(""); // Clear input

    try {
      await send(textToSend);
    } catch (error) {
      console.error("Message send failed:", error);
    }
  };

  return (
    <main className="h-screen bg-[#050505] text-white overflow-hidden">
      <div className="flex h-full">

        {/* ================= SIDEBAR ================= */}
        <aside className="hidden w-[270px] flex-col border-r border-white/5 bg-[#080808] md:flex h-full">

          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-white/5 px-6 py-5 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-400/20 bg-rose-500/10 text-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.15)]">
              ✦
            </div>
            <div>
              <h1 className="text-[16px] font-semibold tracking-wide">
                Docu<span className="text-rose-400">AI</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                Intelligent workspace
              </p>
            </div>
          </div>

          {/* New Conversation Button */}
          <div className="px-4 pt-5 shrink-0">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-300 transition hover:border-rose-400/40 hover:bg-rose-500/15"
            >
              <span className="text-lg">+</span>
              New conversation
            </button>
          </div>

          {/* Chats List with Thin Dark Scrollbar */}
          <div className="flex-1 overflow-y-auto px-4 pt-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
            <div className="mb-3 flex items-center justify-between px-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                Your conversations
              </p>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/30">
                {chats.length}
              </span>
            </div>

            {/* Dynamic Chat List Mapping */}
            <div className="space-y-2">
              {chats.map((chat) => {
                const isActive = chat._id === chatId;
                const docName =
                  typeof chat.documentId === "object" && chat.documentId !== null
                    ? chat.documentId.originalName
                    : "Chat Session";

                return (
                  <button
                    key={chat._id}
                    onClick={() => router.push(`/chat/${chat._id}`)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${isActive
                        ? "border border-rose-400/15 bg-rose-500/[0.06]"
                        : "hover:bg-white/[0.03]"
                      }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm ${isActive
                          ? "bg-rose-500/10 text-rose-400"
                          : "bg-white/5 text-white/30"
                        }`}
                    >
                      ◈
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-xs font-medium ${isActive ? "text-white/80" : "text-white/50"
                          }`}
                      >
                        {docName}
                      </p>
                      <p className="mt-1 text-[10px] text-white/25">
                        {new Date(chat.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Profile */}
          <div className="border-t border-white/5 p-4 shrink-0">
            <div className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-white/[0.03]">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || "User"}
                  className="h-9 w-9 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-600 text-sm font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-white">
                  {user?.name || "User"}
                </p>
                <p className="truncate text-[11px] text-white/30">
                  {user?.email || "Personal workspace"}
                </p>
              </div>
            </div>
          </div>

        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <section className="relative flex min-w-0 flex-1 flex-col h-full overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-rose-600/[0.07] blur-[130px]" />

          {/* Header */}
          <header className="relative flex items-center justify-between border-b border-white/5 px-5 py-4 sm:px-7 shrink-0">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                ◈
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-medium">
                  {typeof currentChat?.documentId === "object" &&
                    currentChat?.documentId !== null
                    ? currentChat.documentId.originalName
                    : "Document Workspace"}
                </h2>
                <p className="text-[10px] text-white/25">Document ready</p>
              </div>
            </div>
          </header>

          {/* ================= CHAT MESSAGES AREA (Scrollable with Thin Dark Scrollbar) ================= */}
          <div className="relative flex-1 overflow-y-auto px-4 py-8 sm:px-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
            <div className="mx-auto max-w-3xl">
              {messages.length === 0 ? (
                <div className="mb-12 flex flex-col items-center text-center pt-12">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-500/10 text-xl text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.12)]">
                    ✦
                  </div>
                  <h3 className="text-xl font-semibold">
                    Ask about your document
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/30">
                    Ask questions about your uploaded file and get instant insights.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.role === "user" ? "justify-end" : "items-start gap-3"
                        }`}
                    >
                      {msg.role !== "user" && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-rose-400/15 bg-rose-500/10 text-sm text-rose-400">
                          ✦
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${msg.role === "user"
                            ? "rounded-br-md bg-rose-500 text-white shadow-[0_0_25px_rgba(244,63,94,0.08)]"
                            : "rounded-tl-md border border-white/7 bg-white/[0.025] text-white/80"
                          }`}
                      >
                        {msg.role === "user" ? (
                          <p className="leading-7">{msg.content}</p>
                        ) : (
                          <div className="prose prose-invert max-w-none text-sm leading-7 [&_ul]:list-disc [&_ul]:pl-4 [&_strong]:text-rose-300">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* ================= THINKING / LOADING UI ================= */}
                  {isSending && (
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-rose-400/15 bg-rose-500/10 text-sm text-rose-400 animate-pulse">
                        ✦
                      </div>
                      <div className="rounded-2xl rounded-tl-md border border-white/7 bg-white/[0.025] px-4 py-3 text-sm text-white/50">
                        <span className="inline-flex items-center gap-1.5">
                          Thinking<span className="animate-bounce">.</span><span className="animate-bounce [animation-delay:0.2s]">.</span><span className="animate-bounce [animation-delay:0.4s]">.</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Scroll Anchor */}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>

          {/* ================= INPUT FOOTER ================= */}
          <div className="relative border-t border-white/5 bg-[#050505] px-4 py-4 sm:px-6 shrink-0">
            <form onSubmit={handleSendMessage} className="mx-auto max-w-3xl">
              <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-[#0b0b0b] px-4 py-2 transition focus-within:border-rose-400/30">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={1}
                  placeholder="Ask anything about your document..."
                  className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent py-2.5 text-sm leading-5 text-white outline-none placeholder:text-white/25"
                />

                <button
                  type="submit"
                  disabled={!message.trim() || isSending}
                  className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500 text-sm text-white shadow-[0_0_18px_rgba(244,63,94,0.15)] transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-20"
                >
                  {isSending ? "..." : "↑"}
                </button>
              </div>

              <p className="mt-2 text-center text-[10px] text-white/15">
                AI responses are based on the uploaded document.
              </p>
            </form>
          </div>

        </section>
      </div>
    </main>
  );
}