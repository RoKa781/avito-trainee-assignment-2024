/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import { Advertisment } from '../../utlis/types';
import { advertisementsService } from '../../shared/api/AdvertisementsService';
import { EnumItemsOnList } from '../../pages/AdvertisementsPage/AdvertisementsPage.helper';
import { useSearchParams } from 'react-router-dom';

export function useAdvertisements() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<EnumItemsOnList>(EnumItemsOnList.LOW);
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [filterParams, setFilterParams] = useState<Record<string, string | undefined>>({});
  const [searchParams, setSearchParams] = useSearchParams();

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

  const fetchAdvertisementsBySearch = async (page: number, itemsPerPage: number, name: string) => {
    setIsLoading(true);
    try {
      const data = await advertisementsService.getAdvertisementsBySearch(page, itemsPerPage, name);
      setAdvertisements(data);
      const dataTotal = await advertisementsService.getAdvertisementsAllBySearch(name);
      setPagesCount(dataTotal.length);
      if (name) {
        setSearchParams({ name });
      } else {
        setSearchParams({});
      }

    } catch (error) {
      setError('Не удалось получить данные. Пожалуйста, попробуйте позже.');
      console.error('Ошибка при загрузке данных', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAdvertisementsByFilter = async (page: number, itemsPerPage: number, filter: Record<string, string | undefined>) => {
    setIsLoading(true);
    try {
      const data = await advertisementsService.getAdvertisementsByFilter(page, itemsPerPage, filter);
      const totalData = await advertisementsService.getAllAdvertisementsByFilter(filter);
      setAdvertisements(data);
      setPagesCount(totalData.length);
    } catch (error) {
      setError('Не удалось получить данные. Пожалуйста, попробуйте позже.');
      console.error('Ошибка при загрузке данных', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const nameParam = searchParams.get('name');
    if (nameParam) {
      setSearchText(nameParam);
      fetchAdvertisementsBySearch(currentPage, itemsPerPage, nameParam);
    } else if (filterParams) {
      fetchAdvertisementsByFilter(currentPage, itemsPerPage, filterParams);
    }
    else {
      fetchAdvertisements(currentPage, itemsPerPage);
    }

  }, [searchParams, currentPage, itemsPerPage]);

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

  const handleSearchClick = useCallback(()=> {
    fetchAdvertisementsBySearch(currentPage, itemsPerPage, searchText);
  }, [fetchAdvertisementsBySearch, currentPage, itemsPerPage]);

  const handleSearchKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchAdvertisementsBySearch(currentPage, itemsPerPage, searchText);
    }
  }, [fetchAdvertisementsBySearch, currentPage, itemsPerPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterParams(prevFilters => {
      const updatedFilters = { ...prevFilters, [name]: value };
      return updatedFilters;
    });
  };

  const applyFilters = () => {
    const updatedSearchParams = new URLSearchParams();
  
    Object.keys(filterParams).forEach(key => {
      const value = filterParams[key];
      if (value) {
        updatedSearchParams.set(key, value);
      }
    });
  
    setSearchParams(updatedSearchParams);

    fetchAdvertisementsByFilter(currentPage, itemsPerPage, filterParams);
    
  };


  return {
    handleSearchClick,
    applyFilters,
    filterParams,
    handleInputChange,
    fetchAdvertisementsBySearch,
    handleSearchKeyDown,
    fetchAdvertisements,
    isModalOpen,
    currentPage,
    itemsPerPage,
    advertisements,
    totalPages,
    isLoading,
    searchText,
    error,
    openModal,
    closeModal,
    handlePageChange,
    handleItemsPerPageChange,
    handleSearchChange,
  };
}
