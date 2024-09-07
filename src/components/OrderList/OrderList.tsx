import OrderCard from '../OrderCard/OrderCard';
import { Order } from '../../utlis/types';
import styles from './OrderList.module.css';

interface OrderListProps {
  orders: Order[];
  onOrderComplete: () => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onOrderComplete }) => {
  return (
    <div className={styles.orderList}>
      {orders.map(order => (
        <OrderCard key={order.id} order={order} onOrderComplete={onOrderComplete} />
      ))}
    </div>
  );
};

export default OrderList;

