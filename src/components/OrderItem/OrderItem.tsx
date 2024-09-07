import React from 'react';

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
    <div className="order-item" style={{ borderBottom: '1px solid gray', padding: '5px 0' }}>
      <p>{item.name}</p>
      <p>Цена: {item.price} руб.</p>
      <a href={item.sellerUrl} target="_blank" rel="noopener noreferrer">
        Перейти к товару
      </a>
    </div>
  );
};

export default OrderItem;
