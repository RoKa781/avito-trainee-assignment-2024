import { Order } from '../../utlis/types';
import { ServerService } from './ServerService';

export class OrderService extends ServerService {
  async getOrders(
    currentPage: number,
    itemsPerPage: number,
    status: number | null
  ): Promise<Order[]> {
    const start = (currentPage - 1) * itemsPerPage;
    let endpoint = `/orders?_sort=-createdAt&_start=${start}&_limit=${itemsPerPage}`;

    if (status !== null) {
      endpoint += `&status=${status}`;
    }

    return this.request(endpoint);
  }

  async getAllOrdersWithStart(currentPage: number, itemsPerPage: number) {
    const start = (currentPage - 1) * itemsPerPage;
    const endpoint = `/orders?_sort=-createdAt&_start=${start}&_limit=${itemsPerPage}`;

    return this.request(endpoint);
  }

  async getAllOrders() {
    const endpoint = '/orders';
    return this.request(endpoint);
  }

  async getOrdersByTotal(
    currentPage: number,
    itemsPerPage: number,
    status: number | null,
    sortOrder: string
  ): Promise<Order[]> {
    const start = (currentPage - 1) * itemsPerPage;
    let endpoint = `/orders?_start=${start}&_limit=${itemsPerPage}`;

    if (sortOrder === 'asc') {
      endpoint += '&_sort=total';
    } else {
      endpoint += '&_sort=-total';
    }

    if (status !== null) {
      endpoint += `&status=${status}`;
    }

    return this.request(endpoint);
  }

  async getAllOrdersByTotal(
    status: number | null,
    sortOrder: string
  ): Promise<Order[]> {
    let endpoint = '/orders';

    if (sortOrder === 'asc') {
      endpoint += '?_sort=total';
    } else {
      endpoint += '?_sort=-total';
    }

    if (status !== null) {
      endpoint += `&status=${status}`;
    }

    return this.request(endpoint);
  }

  async getOrdersByStatus(status: number | null) {
    let endpoint = '/orders?';
    if (status !== null) {
      endpoint += `&status=${status}`;
    }
    return this.request(endpoint);
  }

  async closeOrder(id: string) {
    const endpoint = `/orders/${id}`;
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
