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
  location: string;
  bio: string;
  profilePhoto: string;
  createdAt: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  authMode: AuthMode;
  isAuthModalOpen: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  openAuthModal: (mode?: AuthMode) => void;
  closeAuthModal: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          setUser(null);
          return;
        }

        const nextUser = (await response.json().catch(() => null)) as AuthUser | null;
        setUser(nextUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void loadSession();
  }, []);

  const login = async (email: string, password: string) => {
    if (!email.trim() || password.length < 6) {
      throw new Error("Please provide a valid email and a password with at least 6 characters.");
    }

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password,
      }),
    });

    const payload = (await response.json().catch(() => null)) as AuthUser | { error?: string } | null;

    if (!response.ok) {
      throw new Error(payload && "error" in payload ? payload.error : "Unable to sign in right now.");
    }

    const nextUser = payload as AuthUser;
    setUser(nextUser);
    setIsAuthModalOpen(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    if (!name.trim() || !email.trim() || password.length < 6) {
      throw new Error("Please provide a valid name, email, and a password with at least 6 characters.");
    }

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        location: "Accra, Ghana",
        bio: "Creative storyteller and audience-first maker.",
        profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        role: "member",
      }),
    });

    const payload = (await response.json().catch(() => null)) as AuthUser | { error?: string } | null;

    if (!response.ok) {
      throw new Error(payload && "error" in payload ? payload.error : "Unable to create the account right now.");
    }

    const nextUser = payload as AuthUser;
    setUser(nextUser);
    setIsAuthModalOpen(false);
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/session", {
        method: "DELETE",
        credentials: "include",
      });
    } finally {
      setUser(null);
    }
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
