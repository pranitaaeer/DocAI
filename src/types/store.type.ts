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