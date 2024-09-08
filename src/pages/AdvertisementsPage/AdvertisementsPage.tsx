import styles from './AdvertisementsPage.module.css';
import { AdvertisementCardList } from '../../components/AdvertisementCardList/AdvertisementCardList';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import WrapperPage from '../WrapperPage/WrapperPage';
import Pagination from '../../components/Pagination/Pagination';
import AddAdvertisementModal from '../../components/AddAdvertisementModal/AddAdvertisementModal';
import { Preloader } from '../../components/Preloader/Preloader';
import ErrorNotification from '../../components/ErrorNotification/ErrorNotification';
import { useAdvertisements } from '../../shared/hooks/useAdvertisements';
import { itemsOnList } from './AdvertisementsPage.helper';
import { Helmet } from 'react-helmet-async';

const AdvertisementsPage = () => {
  const {
    fetchAdvertisements,
    isModalOpen,
    currentPage,
    itemsPerPage,
    totalPages,
    isLoading,
    searchText,
    error,
    filteredAdvertisements,
    openModal,
    closeModal,
    handlePageChange,
    handleItemsPerPageChange,
    handleSearchChange,
  } = useAdvertisements();

  return (
    <WrapperPage>
      <Helmet>
        <title>Объявления</title>
      </Helmet>
      {error && (
        <ErrorNotification 
          message={error}
        />
      )}
      <div className={styles.container}>
        <Input 
          name='search' 
          label='Поиск по объявлениям' 
          placeholder='Начните искать' 
          value={searchText}
          onChange={handleSearchChange}
        />
        <div className={styles.selectContainer}>
          <div className={styles.customSelect}>
            <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
              <option value="" disabled>Выберите количество объявлений</option>
              {itemsOnList.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        <Button onClick={openModal}>Добавить новое объявление</Button>
      </div>
      {isLoading ? (
        <Preloader />
      ) : (
        <AdvertisementCardList data={filteredAdvertisements} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <AddAdvertisementModal isOpen={isModalOpen} onClose={closeModal} onSuccess={() => fetchAdvertisements(currentPage, itemsPerPage)} />
    </WrapperPage>
  );
};

export default AdvertisementsPage;