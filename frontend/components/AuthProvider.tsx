'use client';

import { useAuthStore } from "@/lib/auth-store";
import { useEffect, useState } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initializeAuth, isLoading } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      await initializeAuth();
      setIsInitialized(true);
    };
    
    initAuth();
  }, [initializeAuth]);

  if (!isInitialized || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Carregando...
      </div>
    );
  }

  return <>{children}</>;
}