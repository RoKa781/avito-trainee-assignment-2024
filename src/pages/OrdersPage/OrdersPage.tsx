import styles from './OrdersPage.module.css';
import WrapperPage from '../WrapperPage/WrapperPage';
import OrderList from '../../components/OrderList/OrderList';
import { Order, OrderStatus } from '../../utlis/types';
import { useEffect, useState } from 'react';
import { Preloader } from '../../components/Preloader/Preloader';
import Button from '../../components/Button/Button';
import ErrorNotification from '../../components/ErrorNotification/ErrorNotification';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async (status: number | null = null) => {
    setIsLoading(true);

    let url = 'http://localhost:3001/orders';
    const params = new URLSearchParams();

    if (status !== null) {
      params.append('status', status.toString());
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Что-то пошло не так');
      }

      const orders = await response.json();
      setOrders(orders);
    } catch (error) {
      setError('Не удалось получить данные. Пожалуйста, попробуйте позже.');
      console.error('Ошибка при загрузке заказов:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterByStatus = (status: number | null) => {
    setCurrentStatus(status);
    fetchOrders(status);
  };

  const handleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedOrders = [...orders].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.total - b.total;
      } else {
        return b.total - a.total;
      }
    });

    setOrders(sortedOrders);
  };

  useEffect(() => {
    fetchOrders(currentStatus);
  }, [currentStatus]);

  const handleOrderUpdate = async () => {
    await fetchOrders();
  };

  return (
    <WrapperPage>
      {error && (
        <ErrorNotification 
          message={error}
          onClose={() => setError(null)}
        />
      )}
      <div className={styles.buttonsContainer}>
        <Button onClick={() => handleFilterByStatus(null)}>Все</Button>
        <Button onClick={() => handleFilterByStatus(OrderStatus.Created)}>Создан</Button>
        <Button onClick={() => handleFilterByStatus(OrderStatus.Paid)}>Оплачен</Button>
        <Button onClick={() => handleFilterByStatus(OrderStatus.Transport)}>В пути</Button>
        <Button onClick={() => handleFilterByStatus(OrderStatus.DeliveredToThePoint)}>Доставлен в пункт</Button>
        <Button onClick={() => handleFilterByStatus(OrderStatus.Received)}>Получен</Button>
        <Button onClick={() => handleFilterByStatus(OrderStatus.Archived)}>Архивирован</Button>
        <Button onClick={() => handleFilterByStatus(OrderStatus.Refund)}>Возврат</Button>
        <Button onClick={handleSortOrder}>
          Сортировать по {sortOrder === 'asc' ? 'возрастанию' : 'убыванию'}
        </Button>
      </div>
      {isLoading ? <Preloader/> : <OrderList orders={orders} onOrderComplete={() => handleOrderUpdate()}/>}
    </WrapperPage>
  );
};

export default OrdersPage;

