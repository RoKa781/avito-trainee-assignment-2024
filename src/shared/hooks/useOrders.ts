import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { OrderState } from '../../pages/OrdersPage/OrdersPage.helper';
import { orderService } from '../../shared/api/OrdersService';
import { Order } from '../../utlis/types';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<OrderState>('asc');
  const [error, setError] = useState<string | null>(null);
  const [activeStatusCode, setActiveStatusCode] = useState<null | number>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 5;

  const fetchOrders = useCallback(
    async (status: number | null = null) => {
      setIsLoading(true);

      try {
        const orders = await orderService.getOrders(
          currentPage,
          itemsPerPage,
          status
        );
        setOrders(orders);
      } catch (error) {
        setError('Не удалось получить данные. Пожалуйста, попробуйте позже.');
        console.error('Ошибка при загрузке заказов:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, itemsPerPage]
  );

  const fetchOrdersByStatus = useCallback(async (status: number | null) => {
    setIsLoading(true);

    try {
      const orders = await orderService.getOrdersByStatus(status);
      setPagesCount(orders.length);
    } catch (error) {
      setError('Не удалось получить данные. Пожалуйста, попробуйте позже.');
      console.error('Ошибка при загрузке заказов:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchOrdersByTotal = useCallback(async () => {
    setIsLoading(true);

    try {
      const orders = await orderService.getOrdersByTotal(
        currentPage,
        itemsPerPage,
        currentStatus,
        sortOrder
      );
      setOrders(orders);
      const totalOrders = await orderService.getAllOrdersByTotal(
        currentStatus,
        sortOrder
      );
      setPagesCount(totalOrders.length);
    } catch (error) {
      setError('Не удалось получить данные. Пожалуйста, попробуйте позже.');
      console.error('Ошибка при загрузке заказов:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, currentStatus, itemsPerPage, sortOrder]);

  const fetchAllOrders = useCallback(async () => {
    setIsLoading(true);

    try {
      const orders = await orderService.getAllOrdersWithStart(
        currentPage,
        itemsPerPage
      );
      setOrders(orders);
      const totalOrders = await orderService.getAllOrders();
      setPagesCount(totalOrders.length);
    } catch (error) {
      setError('Не удалось получить данные. Пожалуйста, попробуйте позже.');
      console.error('Ошибка при загрузке заказов:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const statusFromParams = searchParams.get('status');
    const pageFromParams = searchParams.get('page');
    const status = statusFromParams ? parseInt(statusFromParams, 10) : null;
    const page = pageFromParams ? parseInt(pageFromParams, 10) : 1;

    setCurrentStatus(status);
    setCurrentPage(page);

    if (status !== null) {
      fetchOrders(status);
      fetchOrdersByStatus(status);
    } else {
      fetchAllOrders();
    }
  }, [fetchAllOrders, fetchOrders, fetchOrdersByStatus, searchParams]);

  useEffect(() => {
    fetchOrders(currentStatus);
  }, [currentPage, currentStatus, fetchOrders]);

  const handleSelectButton = (status: number | null) => () => {
    handleFilterByStatus(status);
    setActiveStatusCode(status);
  };

  const handleFilterByStatus = useCallback(
    (status: number | null) => {
      setCurrentStatus(status);
      setSearchParams({ status: status !== null ? status.toString() : '' });
      fetchOrders(status);
      fetchOrdersByStatus(status);
    },
    [fetchOrders, fetchOrdersByStatus, setSearchParams]
  );

  const handleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    fetchOrdersByTotal();
  };

  const setPagesCount = (dataLength: number) => {
    setTotalPages(Math.ceil(dataLength / itemsPerPage));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({
      status: currentStatus !== null ? currentStatus.toString() : '',
      page: page.toString(),
    });
  };

  return {
    totalPages,
    currentPage,
    setPagesCount,
    handlePageChange,
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
