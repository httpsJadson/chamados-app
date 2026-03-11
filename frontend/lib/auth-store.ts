import { create } from 'zustand';
import { SetState, GetState } from 'zustand';
import api from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'TECH' | 'USER';
  perfilUrl?: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<User>;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set: SetState<AuthStore>, get: GetState<AuthStore>) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token, user } = response.data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      set({ user, token: access_token, isAuthenticated: true });
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      set({ user });
      return user;
    } catch (error) {
      throw error;
    }
  },

  setUser: (user: User) => set({ user, isAuthenticated: true }),

  setToken: (token: string) => set({ token, isAuthenticated: true }),

  initializeAuth: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      set({ token, user: JSON.parse(user), isAuthenticated: true });
    }
    set({ isLoading: false });
  },
}));
