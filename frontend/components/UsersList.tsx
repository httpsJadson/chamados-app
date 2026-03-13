'use client';

import { userService, User } from '@/lib/user-service';
import { useEffect, useState } from 'react';

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingRole, setEditingRole] = useState<'ADMIN' | 'TECHNICIAN' | 'EMPLOYEE'>('EMPLOYEE');
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleEditRole = (user: User) => {
    setEditingId(user.id);
    setEditingRole(user.role);
  };

  const handleSaveRole = async (userId: string) => {
    try {
      setIsUpdating(true);
      await userService.update(userId, { role: editingRole });
      setEditingId(null);
      await loadUsers();
    } catch (err: any) {
      setError('Erro ao atualizar função');
      console.error(err);
    } finally {
      setIsUpdating(false);
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
                    {editingId === user.id ? (
                      <select
                        value={editingRole}
                        onChange={(e) => setEditingRole(e.target.value as any)}
                        className="px-2 py-1 text-black border border-gray-300 rounded text-sm"
                      >
                        <option value="EMPLOYEE">Funcionário</option>
                        <option value="TECHNICIAN">Técnico</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    ) : (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                        {user.role === 'ADMIN' && 'Admin'}
                        {user.role === 'TECHNICIAN' && 'Técnico'}
                        {user.role === 'EMPLOYEE' && 'Funcionário'}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 space-x-2 flex">
                    {editingId === user.id ? (
                      <>
                        <button
                          onClick={() => handleSaveRole(user.id)}
                          disabled={isUpdating}
                          title="Salvar"
                          className="text-green-600 hover:text-green-800 disabled:opacity-50"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          title="Cancelar"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditRole(user)}
                          title="Editar função"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          title="Remover usuário"
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </>
                    )}
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
