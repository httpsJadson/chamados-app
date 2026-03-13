import api from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'TECHNICIAN' | 'EMPLOYEE';
  profileUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  role: 'ADMIN' | 'TECHNICIAN' | 'EMPLOYEE';
}

export interface UpdateUserRequest {
  email?: string;
  name?: string;
  password?: string;
  profileUrl?: string;
  role?: 'ADMIN' | 'TECHNICIAN' | 'EMPLOYEE';
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
