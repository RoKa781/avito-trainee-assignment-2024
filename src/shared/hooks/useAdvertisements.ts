/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Advertisment } from '../../utlis/types';
import { advertisementsService } from '../../shared/api/AdvertisementsService';
import { EnumItemsOnList } from '../../pages/AdvertisementsPage/AdvertisementsPage.helper';

export function useAdvertisements() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<EnumItemsOnList>(EnumItemsOnList.LOW);
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [filteredAdvertisements, setFilteredAdvertisements] = useState<Advertisment[]>([]);

  const setPagesCount = (dataLength: number) => {
    setTotalPages(Math.ceil(dataLength / itemsPerPage));
  };

  const fetchAdvertisements = async (page: number, itemsPerPage: number) => {
    setIsLoading(true);
    try {
      const data = await advertisementsService.getAdvertisements(page, itemsPerPage);
      setAdvertisements(data);

      const totalData = await advertisementsService.getTotalAdvertisements();
      setPagesCount(totalData.length);
    } catch (error) {
      setError('Не удалось получить данные. Пожалуйста, попробуйте позже.');
      console.error('Ошибка при загрузке данных', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvertisements(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const filteredAdv = advertisements.filter(ad =>
      ad.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredAdvertisements(filteredAdv);
    setPagesCount(filteredAdv.length);
  }, [searchText, advertisements]);

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

  return {
    fetchAdvertisements,
    isModalOpen,
    currentPage,
    itemsPerPage,
    advertisements,
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
  };
}
