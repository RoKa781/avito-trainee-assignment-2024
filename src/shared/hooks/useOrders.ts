import { useState, useEffect, useCallback } from 'react';
import { Order } from '../../utlis/types';
import { orderService } from '../../shared/api/OrdersService';
import { OrderState } from '../../pages/OrdersPage/OrdersPage.helper';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<OrderState>('asc');
  const [error, setError] = useState<string | null>(null);
  const [activeStatusCode, setActiveStatusCode] = useState<null | number>(null);

  const fetchOrders = async (status: number | null = null, sortOrder: OrderState = 'asc') => {
    setIsLoading(true);

    try {
      const orders = await orderService.getOrders(status, sortOrder);
      setOrders(orders);
    } catch (error) {
      setError('Не удалось получить данные. Пожалуйста, попробуйте позже.');
      console.error('Ошибка при загрузке заказов:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentStatus, sortOrder);
  }, [currentStatus, sortOrder]);

  const handleSelectButton = (status: number | null) => () => {
    handleFilterByStatus(status);
    setActiveStatusCode(status);
  };

  const handleFilterByStatus = useCallback(
    (status: number | null) => {
      setCurrentStatus(status);
      fetchOrders(status, sortOrder);
    },
    [sortOrder],
  );

  const handleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    fetchOrders(currentStatus, newSortOrder);
  };

  return {
    fetchOrders,
    orders,
    isLoading,
    currentStatus,
    sortOrder,
    error,
    activeStatusCode,
    handleSelectButton,
    handleFilterByStatus,
    handleSortOrder,
  };
}
