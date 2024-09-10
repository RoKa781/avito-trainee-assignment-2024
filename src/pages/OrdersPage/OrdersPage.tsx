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
import Pagination from '../../components/Pagination/Pagination';
import { useParams } from 'react-router-dom';

const OrdersPage: React.FC = () => {
  const {
    totalPages,
    currentPage,
    handlePageChange,
    fetchOrders,
    orders,
    isLoading,
    currentStatus,
    sortOrder,
    error,
    activeStatusCode,
    handleSelectButton,
    handleSortOrder,
  } = useOrders();

  const { id } = useParams<{ id: string }>();

  let filteredOrders = [];
  
  if (id) {
    filteredOrders = orders.filter(order =>
      order.items.some(itemDetail => itemDetail.id === id),
    );
  } else {
    filteredOrders = orders;
  }
  
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
      {!orders.length && (<h2>Ничего не найдено</h2>)}
      {isLoading ? (
        <Preloader />
      ) : (
        <OrderList
          orders={filteredOrders}
          onOrderComplete={() => fetchOrders(currentStatus)}
        />
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
    </WrapperPage>
  );
};

export default OrdersPage;
