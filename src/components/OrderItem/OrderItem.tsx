import styles from './OrderItem.module.css';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  sellerUrl: string;
}

interface Props {
  item: OrderItem;
}

const OrderItem: React.FC<Props> = ({ item }) => {
  return (
    <div className={styles.orderItem}>
      <p>{item.name}</p>
      <p>Цена: {item.price} руб.</p>
      <a href={item.sellerUrl} target="_blank" rel="noopener noreferrer">
        Перейти к товару
      </a>
    </div>
  );
};

export default OrderItem;
