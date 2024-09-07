import { useEffect, useState } from 'react';
import styles from './AdvertisementsPage.module.css';
import { AdvertisementCardList } from '../../components/AdvertisementCardList/AdvertisementCardList';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import WrapperPage from '../WrapperPage/WrapperPage';
import Pagination from '../../components/Pagination/Pagination';
import AddAdvertisementModal from '../../components/AddAdvertisementModal/AddAdvertisementModal';
import { Advertisment } from '../../utlis/types';
import { Preloader } from '../../components/Preloader/Preloader';
import ErrorNotification from '../../components/ErrorNotification/ErrorNotification';

const AdvertisementsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchAdvertisements = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/advertisements?_start=${(currentPage - 1) * itemsPerPage}&_limit=${itemsPerPage}`,
      );
      if (!response.ok) {
        throw new Error('Что-то пошло не так');
      }
      const data = await response.json();
      setAdvertisements(data);

      const totalResponse = await fetch('http://localhost:3001/advertisements');
      if (!totalResponse.ok) {
        throw new Error('Не удалось получить общее количество элементов');
      }
      const totalData = await totalResponse.json();

      setTotalPages(Math.ceil(totalData.length / itemsPerPage));
    } catch (error) {
      setError('Не удалось получить данные. Пожалуйста, попробуйте позже.');
      console.error('Ошибка при загрузке данных', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvertisements();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const filteredAdvertisements = advertisements.filter(ad =>
    ad.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <WrapperPage>
      {error && (
        <ErrorNotification 
          message={error}
          onClose={() => setError(null)}
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
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
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
      <AddAdvertisementModal isOpen={isModalOpen} onClose={closeModal} onChange={() => fetchAdvertisements()} />
    </WrapperPage>
  );
};

export default AdvertisementsPage;


