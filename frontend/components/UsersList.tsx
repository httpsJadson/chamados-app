'use client';

import { userService, User } from '@/lib/user-service';
import { useEffect, useState } from 'react';

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const response = await userService.getAll();
      setUsers(response.data);
    } catch (err: any) {
      setError('Erro ao carregar usuários');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja remover este usuário?')) return;

    try {
      await userService.remove(id);
      await loadUsers();
    } catch (err: any) {
      setError('Erro ao remover usuário');
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Carregando usuários...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gerenciar usuários</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {users.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Nenhum usuário encontrado</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Nome
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Função
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-semibold"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
