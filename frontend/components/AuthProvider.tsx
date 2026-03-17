'use client';

import { useAuthStore } from "@/lib/auth-store";
import { useEffect, useState } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initializeAuth, isLoading } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    
    const initAuth = async () => {
      try {
        if (mounted && !isInitialized) {
          await initializeAuth();
          if (mounted) {
            setIsInitialized(true);
          }
        }
      } catch (err) {
        console.error('Erro ao inicializar autenticação:', err);
        if (mounted) {
          setError('Erro ao carregar autenticação');
          setIsInitialized(true); // Continua mesmo com erro
        }
      }
    };
    
    if (!isInitialized) {
      initAuth();
    }
    
    return () => {
      mounted = false;
    };
  }, [initializeAuth, isInitialized]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <div className="text-center">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Recarregar
          </button>
        </div>
      </div>
    );
  }

  if (!isInitialized || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}