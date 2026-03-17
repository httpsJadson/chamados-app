'use client';

import { useAuthStore } from '@/lib/auth-store';
import { userService } from '@/lib/user-service';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { isAuthenticated, user, setUser } = useAuthStore();
  const router = useRouter();
  const [name, setName] = useState('');
  const [perfilUrl, setPerfilUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user) {
      setName(user.name);
      setPerfilUrl(user.perfilUrl || '');
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await userService.update(user!.id, {
        name,
        profileUrl: perfilUrl,
      });

      setUser(response.data);
      setSuccess('Perfil atualizado com sucesso!');
    } catch (err: any) {
      setError('Erro ao atualizar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-14">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Seu Perfil</h1>

        <div className="mb-8 p-6 bg-blue-50 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-semibold text-gray-800">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Função</p>
              <p className="text-lg font-semibold text-gray-800">{user.role}</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL da foto de perfil
            </label>
            <input
              type="url"
              value={perfilUrl}
              onChange={(e) => setPerfilUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="https://exemplo.com/foto.jpg"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? 'Salvando...' : 'Salvar alterações'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
