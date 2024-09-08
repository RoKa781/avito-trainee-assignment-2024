import { Order } from '../../utlis/types';
import { ServerService } from './ServerService';

export class OrderService extends ServerService {
  async getOrders(status: number | null, sortOrder: 'asc' | 'desc'): Promise<Order[]> {
    let endpoint = '/orders';
    const params = new URLSearchParams();
    
    if (status !== null) {
      params.append('status', status.toString());
    }
    
    params.append('_sort', sortOrder === 'asc' ? 'total' : '-total');
    
    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }
    
    return this.request(endpoint);
  }

  async closeOrder(id: string) {
    const endpoint  = `/orders/${id}`;
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 5 }),
    };

    return this.request(endpoint, options);
  }
}

export const orderService = new OrderService();