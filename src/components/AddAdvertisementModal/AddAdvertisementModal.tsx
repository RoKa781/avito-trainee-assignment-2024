import { useState } from 'react';
import styles from './AddAdvertisementModal.module.css';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import { Preloader } from '../Preloader/Preloader';
import { advertisementsService } from '../../shared/api/AdvertisementsService';

interface AddAdvertisementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

const AddAdvertisementModal: React.FC<AddAdvertisementModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [urlImage, setUrlImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const advertisementData = {
      name: title,
      price: price === '' ? 0 : price,
      createdAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      imageUrl: urlImage,
    };

    try {
      await advertisementsService.addAdvertisement(advertisementData);

      clearForm();
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setUrlImage('');
    setTitle('');
    setDescription('');
    setPrice('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Новое объявление">
      <form className={styles.modal} onSubmit={handleSubmit}>
        <Input
          name="urlimage"
          label="URL Картинки"
          placeholder="Введите URL"
          required
          type="text"
          value={urlImage}
          onChange={(e) => setUrlImage(e.target.value)}
        />
        <Input
          name="title"
          label="Название"
          placeholder="Введите название"
          required
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          name="description"
          label="Описание"
          placeholder="Введите описание товара"
          required
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="number"
          name="price"
          label="Стоимость"
          placeholder="Введите стоимость"
          required
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        {isLoading ? <Preloader /> : <Button type="submit">Сохранить</Button>}
      </form>
    </Modal>
  );
};

export default AddAdvertisementModal;
