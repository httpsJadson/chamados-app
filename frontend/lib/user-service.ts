import api from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'TECH' | 'USER';
  perfilUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  role: 'ADMIN' | 'TECH' | 'USER';
}

export interface UpdateUserRequest {
  email?: string;
  name?: string;
  password?: string;
  perfilUrl?: string;
}

export const userService = {
  create: (data: CreateUserRequest) => api.post('/users', data),
  getAll: (page?: number, limit?: number) =>
    api.get('/users', { params: { page, limit } }),
  getById: (id: string) => api.get(`/users/${id}`),
  update: (id: string, data: UpdateUserRequest) =>
    api.patch(`/users/${id}`, data),
  getProfile: () => api.get('/users/profile'),
  remove: (id: string) => api.delete(`/users/${id}`),
};
