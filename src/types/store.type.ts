export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Document {
  _id: string;
  userId: string;
  name: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  status: "processing" | "ready" | "failed";
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface Chat {
  _id: string;
  userId: string;
  documentId: string | {
    _id: string;
    name: string;
    originalName: string;
  };
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export interface DocumentResponse {
  message: string;
  document: Document;
}

export interface ChatResponse {
  message: string;
  chat: Chat;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  register: (data: RegisterData) => Promise<AuthResponse>;
  login: (data: LoginData) => Promise<AuthResponse>;
  logout: () => Promise<{ message: string }>;
  fetchMe: () => Promise<any>;
  googleLogin: () => void;
  googleCallback: (code: string) => Promise<void>;
}

export interface DocumentState {
  documents: Document[];
  selectedDocument: Document | null;

  isLoading: boolean;
  isUploading: boolean;

  error: string | null;

  fetchDocuments: () => Promise<DocumentResponse[]>;

  upload: (file: File) => Promise<Document>;

  fetchDocument: (
    id: string
  ) => Promise<DocumentResponse>;

  removeDocument: (
    id: string
  ) => Promise<DocumentResponse>;

  clearSelectedDocument: () => void;
}

export interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
  messages: ChatMessage[];

  isLoading: boolean;
  isSending: boolean;

  error: string | null;

  createNewChat: (
    documentId: string
  ) => Promise<Chat>;

  fetchChats: () => Promise<ChatResponse[]>;

  fetchChat: (
    id: string
  ) => Promise<ChatResponse>;

  send: (
    message: string
  ) => Promise<ChatResponse>;

  removeChat: (
    id: string
  ) => Promise<ChatResponse>;

  clearCurrentChat: () => void;
}