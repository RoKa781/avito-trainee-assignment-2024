import OrderCard, { OrderCardProps } from '../OrderCard/OrderCard';
import { Order } from '../../utlis/types';
import styles from './OrderList.module.css';

type OrderListProps = {
  orders: Order[];
} & Pick<OrderCardProps, 'onOrderComplete'>

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

