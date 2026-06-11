import { create } from "zustand";

export interface User {
  email: string;
  name: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  login: (email: string, phone?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  loginModalOpen: false,
  setLoginModalOpen: (open) => set({ loginModalOpen: open }),
  login: (email, phone) => {
    // Generate a default name from email
    const name = email.split("@")[0];
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    set({
      user: { email, phone, name: formattedName },
      isLoggedIn: true,
      loginModalOpen: false,
    });
  },
  logout: () => set({ user: null, isLoggedIn: false }),
}));
