import { useState, useEffect } from 'react';
import { Advertisment } from '../../utlis/types';
import { advertisementService } from '../api/AdvertisementService';

export function useAdvertisement(id: string | null) {
  const [order, setOrder] = useState<Advertisment | null>(null);
  const [formData, setFormData] = useState<Partial<Advertisment>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchAdvertisement = async (id: string) => {
    setIsLoading(true);
    try {
      const advertisement = await advertisementService.getAdvertisement(id);
      setOrder(advertisement);
      setFormData(advertisement);
    } catch (error) {
      setError('Не удалось получить данные. Пожалуйста, попробуйте позже.');
      console.error('Ошибка при получении объявления', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAdvertisement(id);
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (id: string) => {
    setIsLoading(true);
    try {
      const updatedAdvertisement = await advertisementService.updateAdvertisement(id, formData);
      setOrder(updatedAdvertisement);
      setIsEditing(false);
    } catch (error) {
      setError('Не удалось сохранить данные. Пожалуйста, попробуйте позже.');
      console.error('Ошибка при сохранении изменений', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    order,
    formData,
    isLoading,
    error,
    isEditing,
    handleInputChange,
    handleSave,
    setIsEditing,
  };
}
