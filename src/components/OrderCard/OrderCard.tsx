import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getStatusLabel } from '../../utlis/getStatusLabel';
import { Order } from '../../utlis/types';
import Button from '../Button/Button';
import styles from './OrderCard.module.css';
import ErrorNotification from '../ErrorNotification/ErrorNotification';

interface OrderCardProps {
  order: Order;
  onOrderComplete: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onOrderComplete }) => {
  const [showItems, setShowItems] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/orders/${order.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 5 }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при обновлении заказа');
      }
      onOrderComplete();
    } catch (error) {
      setError('Произошла ошибка');
      console.error('Ошибка при сохранении изменений', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleItemsVisibility = () => {
    setShowItems(prevState => !prevState);
  };

  return (
    <div className={styles.card}>
      {error && (
        <ErrorNotification 
          message={error}
          onClose={() => setError('')}
        />
      )}
      <div className={styles.order}>
        <h2>Заказ №{order.id}</h2>
        <p>Статус: {getStatusLabel(order.status)}</p>
        <p>Дата создания: {new Date(order.createdAt).toLocaleString()}</p>
        {order.finishedAt && <p>Дата завершения: {new Date(order.finishedAt).toLocaleString()}</p>}
        <p>Способ доставки: {order.deliveryWay}</p>
        <p>Общая сумма: {order.total} руб.</p>
        <Button onClick={toggleItemsVisibility}>
          {showItems ? 'Скрыть товары' : 'Показать товары'}
        </Button>
        <Button onClick={handleComplete} disabled={isLoading}>
          {isLoading ? 'Завершение...' : 'Завершить заказ'}
        </Button>
      </div>

      {showItems && (
        <div className={styles.itemContainer}>
          <h3 className={styles.itemTitle}>Товары в заказе:</h3>
          <ul className={styles.itemList}>
            {order.items.map(item => (
              <Link key={item.id} to={`/adv/${item.id}`} className={styles.linkItem}>
                <li className={styles.itemInformationContainer}>
                  <p>Название: {item.name}</p>
                  <p>Цена: {item.price} руб.</p>
                  <p>Количество: {item.count}</p>
                  <p>Просмотры: {item.views}</p>
                  <p>Лайки: {item.likes}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderCard;


