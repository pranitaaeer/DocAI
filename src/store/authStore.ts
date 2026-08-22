import { create } from "zustand";

import {
    registerUser,
    loginUser,
    logoutUser,
    getMyInfo,
    googleLogin as googleLoginApi,
    googleCallback as googleCallbackApi,
    changePassword,
    changeAvatar,
} from "../services/authapi";

import { AuthState } from "../types/store.type"


export const useAuthStore = create<AuthState>((set,get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,

    // Register
    register: async (data) => {
        try {
            set({ isLoading: true });

            const response = await registerUser(data);

            set({
                user: response.user,
                isAuthenticated: true,
            });
            return response
        } finally {
            set({ isLoading: false });
        }
    },

    // Login
    login: async (data) => {
        try {
            set({ isLoading: true });

            const response = await loginUser(data);

            set({
                user: response.user,
                isAuthenticated: true,
            });
            return response
        } finally {
            set({ isLoading: false });
        }
    },

    // Logout
    logout: async () => {
        try {
            set({ isLoading: true });

            const response = await logoutUser();

            set({
                user: null,
                isAuthenticated: false,
            });
            return response
        } finally {
            set({ isLoading: false });
        }
    },

    // Check currently logged-in user
    fetchMe: async () => {
        try {
            set({ isLoading: true });

            const response = await getMyInfo();

            set({
                user: response.user,
                isAuthenticated: true,
            });
            return response
        } catch (error) {
            set({
                user: null,
                isAuthenticated: false,
            });
        } finally {
            set({ isLoading: false });
        }
    },
changePassword: async (passwords) => {
    try {
        set({ isLoading: true });
        const response = await changePassword(passwords);
        return response;
    } finally {
        set({ isLoading: false });
    }
},

changeAvatar: async (file) => {
    try {
        set({ isLoading: true });
        const response = await changeAvatar(file);
        
        await get().fetchMe(); 
        return response;
    } finally {
        set({ isLoading: false });
    }
},
    googleLogin: () => {
        googleLoginApi();
    },

    // Handle Google Callback
    googleCallback: async (code) => {
        try {
            set({ isLoading: true });

            const response = await googleCallbackApi(code);

            set({
                user: response.user,
                isAuthenticated: true,
            });
        } finally {
            set({ isLoading: false });
        }
    },
}));