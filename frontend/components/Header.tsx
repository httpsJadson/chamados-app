'use client';

import { useAuthStore } from '@/lib/auth-store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <header className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-bold">
              🎫 Chamados TI
            </Link>
            <nav className="hidden md:flex gap-4">
              <Link href="/" className="hover:text-blue-100">
                Home
              </Link>
              <Link href="/tickets" className="hover:text-blue-100">
                Chamados
              </Link>
              {user.role === 'ADMIN' && (
                <Link href="/users" className="hover:text-blue-100">
                  Usuários
                </Link>
              )}
              <Link href="/profile" className="hover:text-blue-100">
                Perfil
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-sans">
              {user.name} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
