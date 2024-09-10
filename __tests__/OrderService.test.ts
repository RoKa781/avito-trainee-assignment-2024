import { OrderService } from './../src/shared/api/OrdersService';
import fetchMock from 'jest-fetch-mock';
import { Order } from './../src/utlis/types';
import config from '../src/config';
const mockOrders: Order[] = [
  {
    id: '4',
    status: 4,
    createdAt: '2024-08-12T20:20:55.351Z',
    finishedAt: '2024-08-12T20:25:55.351Z',
    total: 33000,
    deliveryWay: 'sdek',
    items: [
      {
        id: '2',
        name: 'Ведро снега',
        description: 'Последняя возможность купить по выгодной цене!',
        price: 3000,
        createdAt: '2023-08-12T20:16:55.351Z',
        views: 77832,
        likes: 45666,
        imageUrl: '',
        count: 10,
      },
      {
        id: '5',
        name: 'Носки',
        price: 6000,
        createdAt: '2024-06-12T20:16:55.351Z',
        views: 0,
        likes: 0,
        imageUrl: '',
        count: 5,
      },
    ],
  },
  {
    id: '5',
    status: 2,
    createdAt: '2024-08-12T20:20:55.351Z',
    finishedAt: '2024-08-12T20:25:55.351Z',
    total: 33000,
    deliveryWay: 'sdek',
    items: [
      {
        id: '2',
        name: 'Ведро снега',
        description: 'Последняя возможность купить по выгодной цене!',
        price: 3000,
        createdAt: '2023-08-12T20:16:55.351Z',
        views: 77832,
        likes: 45666,
        imageUrl: '',
        count: 10,
      },
    ],
  },
];

fetchMock.enableMocks();

describe('OrderService', () => {
  let orderService: OrderService;

  beforeEach(() => {
    fetchMock.resetMocks();
    orderService = new OrderService();
  });

  describe('getOrders', () => {
    it('должен корректно запрашивать заказы с параметрами', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockOrders));

      const orders = await orderService.getOrders(1, 10, 1);

      expect(fetchMock).toHaveBeenCalledWith(`${config.apiUrl}/orders?_sort=-createdAt&_start=0&_limit=10&status=1`, {
        headers: { 'Content-Type': 'application/json' },
      });
      expect(orders).toEqual(mockOrders);
    });

    it('должен корректно обрабатывать пустой список заказов', async () => {
      fetchMock.mockResponseOnce(JSON.stringify([]));

      const orders = await orderService.getOrders(1, 10, 1);

      expect(orders).toEqual([]);
    });

    it('должен корректно обрабатывать ошибки сервера', async () => {
      fetchMock.mockRejectOnce(new Error('Server error'));

      await expect(orderService.getOrders(1, 10, 1)).rejects.toThrow('Server error');
    });
  });

  describe('getAllOrdersWithStart', () => {
    it('должен корректно запрашивать все заказы с параметрами стартовой позиции', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockOrders));

      const orders = await orderService.getAllOrdersWithStart(1, 10);

      expect(fetchMock).toHaveBeenCalledWith(`${config.apiUrl}/orders?_sort=-createdAt&_start=0&_limit=10`, {
        headers: { 'Content-Type': 'application/json' },
      });
      expect(orders).toEqual(mockOrders);
    });

    it('должен корректно обрабатывать пустой список заказов', async () => {
      fetchMock.mockResponseOnce(JSON.stringify([]));

      const orders = await orderService.getAllOrdersWithStart(1, 10);

      expect(orders).toEqual([]);
    });
  });

  describe('getAllOrders', () => {
    it('должен корректно запрашивать все заказы', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockOrders));

      const orders = await orderService.getAllOrders();

      expect(fetchMock).toHaveBeenCalledWith(`${config.apiUrl}/orders`, {
        headers: { 'Content-Type': 'application/json' },
      });
      expect(orders).toEqual(mockOrders);
    });

    it('должен корректно обрабатывать пустой список заказов', async () => {
      fetchMock.mockResponseOnce(JSON.stringify([]));

      const orders = await orderService.getAllOrders();

      expect(orders).toEqual([]);
    });
  });

  describe('getOrdersByTotal', () => {
    it('должен корректно запрашивать заказы с параметрами сортировки по total', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockOrders));

      const orders = await orderService.getOrdersByTotal(1, 10, 1, 'asc');

      expect(fetchMock).toHaveBeenCalledWith(`${config.apiUrl}/orders?_start=0&_limit=10&_sort=total&status=1`, {
        headers: { 'Content-Type': 'application/json' },
      });
      expect(orders).toEqual(mockOrders);
    });

    it('должен корректно обрабатывать пустой список заказов', async () => {
      fetchMock.mockResponseOnce(JSON.stringify([]));

      const orders = await orderService.getOrdersByTotal(1, 10, 1, 'asc');

      expect(orders).toEqual([]);
    });
  });

  describe('getAllOrdersByTotal', () => {
    it('должен корректно запрашивать все заказы с сортировкой по total', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockOrders));

      const orders = await orderService.getAllOrdersByTotal(1, 'asc');

      expect(fetchMock).toHaveBeenCalledWith(`${config.apiUrl}/orders?_sort=total&status=1`, {
        headers: { 'Content-Type': 'application/json' },
      });
      expect(orders).toEqual(mockOrders);
    });

    it('должен корректно обрабатывать пустой список заказов', async () => {
      fetchMock.mockResponseOnce(JSON.stringify([]));

      const orders = await orderService.getAllOrdersByTotal(1, 'asc');

      expect(orders).toEqual([]);
    });
  });

  describe('getOrdersByStatus', () => {
    it('должен корректно запрашивать заказы по статусу', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockOrders));

      const orders = await orderService.getOrdersByStatus(1);

      expect(fetchMock).toHaveBeenCalledWith(`${config.apiUrl}/orders?&status=1`, {
        headers: { 'Content-Type': 'application/json' },
      });
      expect(orders).toEqual(mockOrders);
    });

    it('должен корректно обрабатывать пустой список заказов', async () => {
      fetchMock.mockResponseOnce(JSON.stringify([]));

      const orders = await orderService.getOrdersByStatus(1);

      expect(orders).toEqual([]);
    });
  });

  describe('closeOrder', () => {
    it('должен корректно отправлять запрос на закрытие заказа', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}));

      await orderService.closeOrder('123');

      expect(fetchMock).toHaveBeenCalledWith(`${config.apiUrl}/orders/123`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 5 }),
      });
    });

    it('должен обрабатывать ошибки при закрытии заказа', async () => {
      fetchMock.mockRejectOnce(new Error('Failed to close order'));

      await expect(orderService.closeOrder('123')).rejects.toThrow('Failed to close order');
    });

    it('должен возвращать успешный ответ при закрытии заказа', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

      const result = await orderService.closeOrder('123');

      expect(result).toEqual({ success: true });
    });

    it('должен корректно обрабатывать некорректный ID заказа', async () => {
      fetchMock.mockRejectOnce(new Error('Order not found'));

      await expect(orderService.closeOrder('999')).rejects.toThrow('Order not found');
    });
  });
});




