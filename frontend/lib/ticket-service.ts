import api from './api';
import { Message } from './message-service';
import { User } from './user-service';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING_CUSTOMER' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdBy: User;
  assignedTo?: User;
  diagnosis?: string;
  messages?: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketRequest {
  title: string;
  description: string;
}

export interface UpdateTicketStatusRequest {
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING_CUSTOMER' | 'RESOLVED' | 'CLOSED';
}

export interface UpdateTicketPriorityRequest {
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface UpdateTicketDiagnosisRequest {
  diagnosis: string;
}

export const ticketService = {
  create: (data: CreateTicketRequest) => api.post('/tickets', data),
  getAll: () => api.get('/tickets'),
  getById: (id: string) => api.get(`/tickets/${id}`),
  updateStatus: (id: string, data: UpdateTicketStatusRequest) =>
    api.patch(`/tickets/${id}/status`, data),
  updatePriority: (id: string, data: UpdateTicketPriorityRequest) =>
    api.patch(`/tickets/${id}/priority`, data),
  updateAssigned: (id: string) => api.patch(`/tickets/${id}/assigned`),
  updateDiagnosis: (id: string, data: UpdateTicketDiagnosisRequest) =>
    api.patch(`/tickets/${id}/diagnosis`, data),
  remove: (id: string) => api.delete(`/tickets/${id}`),
};
