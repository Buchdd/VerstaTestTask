import axios from 'axios';
import type { CreateOrderPayload, JoinedOrder } from '../types';

const API_BASE_URL = 'http://localhost:5283/api';

export const api = {
  getOrders: async (): Promise<JoinedOrder[]> => {
    const response = await axios.get<JoinedOrder[]>(`${API_BASE_URL}/orders`);
    return response.data;
  },
  createOrder: async (payload: CreateOrderPayload): Promise<JoinedOrder> => {
    const response = await axios.post<JoinedOrder>(`${API_BASE_URL}/orders`, payload);
    return response.data;
  },
};