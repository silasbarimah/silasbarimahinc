"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import AuthModal from "./AuthModal";

type AuthMode = "signin" | "signup";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "member" | "admin";
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  authMode: AuthMode;
  isAuthModalOpen: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  openAuthModal: (mode?: AuthMode) => void;
  closeAuthModal: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "silasbarimah.auth";

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = readStoredUser();
    setUser(storedUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const storedUser = readStoredUser();

    if (!storedUser) {
      throw new Error("No account found. Please create one first.");
    }

    if (storedUser.email !== email.trim().toLowerCase()) {
      throw new Error("The email you entered does not match the stored account.");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    if (storedUser.password !== password) {
      throw new Error("The password you entered is incorrect.");
    }

    setUser(storedUser);
    setIsAuthModalOpen(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    if (!name.trim() || !email.trim() || password.length < 6) {
      throw new Error("Please provide a valid name, email, and a password with at least 6 characters.");
    }

    const nextUser: AuthUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: "member",
    };

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    }

    setUser(nextUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setUser(null);
  };

  const openAuthModal = (mode: AuthMode = "signin") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      authMode,
      isAuthModalOpen,
      login,
      signup,
      logout,
      openAuthModal,
      closeAuthModal,
    }),
    [user, loading, authMode, isAuthModalOpen],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
