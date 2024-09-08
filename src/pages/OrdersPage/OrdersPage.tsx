import cn from 'classnames';
import styles from './OrdersPage.module.css';
import WrapperPage from '../WrapperPage/WrapperPage';
import OrderList from '../../components/OrderList/OrderList';
import { Preloader } from '../../components/Preloader/Preloader';
import Button from '../../components/Button/Button';
import ErrorNotification from '../../components/ErrorNotification/ErrorNotification';
import { buttonsFilterStatuses } from './OrdersPage.helper';
import { useOrders } from '../../shared/hooks/useOrders';
import { Helmet } from 'react-helmet-async';

const OrdersPage: React.FC = () => {
  const {
    fetchOrders,
    orders,
    isLoading,
    error,
    currentStatus,
    sortOrder,
    activeStatusCode,
    handleSelectButton,
    handleSortOrder,
  } = useOrders();

  return (
    <WrapperPage>
      <Helmet>
        <title>Заказы</title>
      </Helmet>
      {error && (
        <ErrorNotification message={error} />
      )}
      <div className={styles.buttonsContainer}>
        {buttonsFilterStatuses.map(button => (
          <Button 
            key={button.statusCode}
            className={cn({ [styles.active]: button.statusCode === activeStatusCode })}
            onClick={handleSelectButton(button.statusCode)}
          >
            {button.name}
          </Button>
        ))}
        <Button onClick={handleSortOrder}>
          Сортировать по {sortOrder === 'asc' ? 'возрастанию' : 'убыванию'}
        </Button>
      </div>
      {isLoading ? (
        <Preloader />
      ) : (
        <OrderList
          orders={orders}
          onOrderComplete={() => fetchOrders(currentStatus, sortOrder)}
        />
      )}
    </WrapperPage>
  );
};

export default OrdersPage;
