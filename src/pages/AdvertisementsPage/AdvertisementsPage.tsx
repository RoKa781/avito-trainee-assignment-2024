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
import Filters from '../../components/Filters/Filters';
import svg from '../../images/icons8-search.svg';

const AdvertisementsPage = () => {
  const {
    filterParams,
    fetchAdvertisements,
    isModalOpen,
    currentPage,
    itemsPerPage,
    totalPages,
    isLoading,
    searchText,
    error,
    advertisements,
    openModal,
    closeModal,
    handlePageChange,
    handleItemsPerPageChange,
    handleSearchChange,
    handleSearchKeyDown,
    handleInputChange,
    applyFilters,
    handleSearchClick,
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
        <div className={styles.inputContainer}>
          <Input 
            name='search' 
            label='Поиск по объявлениям' 
            placeholder='Начните искать' 
            value={searchText}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
          <button className={styles.searchButton} onClick={handleSearchClick}>
            <img src={svg} alt='search'/>
          </button>
        </div>
        <Filters handleInputChange={handleInputChange}  filterParams={filterParams} applyFilters={applyFilters}/>
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
      {!advertisements.length && (<h2>Объявлений не найдено</h2>)}
      {isLoading ? (
        <Preloader />
      ) : (
        <AdvertisementCardList data={advertisements} />
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