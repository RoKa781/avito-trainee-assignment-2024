import { OrderStatus } from '../../utlis/types';

export type OrderState = 'asc' | 'desc';

export const buttonsFilterStatuses = [
  { name: 'Все', statusCode: null },
  { name: 'Создан', statusCode: OrderStatus.Created },
  { name: 'Оплачен', statusCode: OrderStatus.Paid },
  { name: 'В пути', statusCode: OrderStatus.Transport },
  { name: 'Доставлен в пункт', statusCode: OrderStatus.DeliveredToThePoint },
  { name: 'Получен', statusCode: OrderStatus.Received },
  { name: 'Архивирован', statusCode: OrderStatus.Archived },
  { name: 'Возврат', statusCode: OrderStatus.Refund },
];


export const getStatusLabel = (status: number) => {
  switch (status) {
  case OrderStatus.Created:
    return 'Создан';
  case OrderStatus.Paid:
    return 'Оплачен';
  case OrderStatus.Transport:
    return 'В пути';
  case OrderStatus.DeliveredToThePoint:
    return 'Доставлен в пункт';
  case OrderStatus.Received:
    return 'Получен';
  case OrderStatus.Archived:
    return 'Архивирован';
  case OrderStatus.Refund:
    return 'Возврат';
  default:
    return 'Неизвестный статус';
  }
};