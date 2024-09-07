import { useEffect, useState } from 'react';
import { Advertisment } from '../../utlis/types';
import { useParams } from 'react-router-dom';
import { Preloader } from '../../components/Preloader/Preloader';
import Input from '../../components/Input/Input';
import styles from './AdvertisementPage.module.css';
import Button from '../../components/Button/Button';
import svg from '../../images/pencil-svgrepo-com.svg';
import ErrorNotification from '../../components/ErrorNotification/ErrorNotification';

const AdvertisementPage = () => {
  const [order, setOrder] = useState<Advertisment>();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Advertisment>>({
    imageUrl: '',
    name: '',
    description: '',
    price: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();


  useEffect(() => {
    const fetchAdvertisement = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/advertisements/${id}`);
        if (!response.ok) {
          throw new Error('Что-то пошло не так');
        }
        const order = await response.json();
        setOrder(order);
        setFormData(order);
      } catch (error) {
        setError('Не удалось получить данные. Пожалуйста, попробуйте позже.');
        console.error('Ошибка при получении объявления', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdvertisement();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/advertisements/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Ошибка при обновлении объявления');
      }

      const updatedOrder = await response.json();
      setOrder(updatedOrder);
      setIsEditing(false);
    } catch (error) {
      setError('Не удалось получить данные. Пожалуйста, попробуйте позже.');
      console.error('Ошибка при сохранении изменений', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <main className={styles.main}>
      {error && (
        <ErrorNotification 
          message={error}
          onClose={() => setError(null)}
        />
      )}
      {isEditing ? (
        <><div className={styles.editForm}>
          <Input
            type="url"
            name="imageUrl"
            label="URL изображения"
            value={formData.imageUrl || ''}
            onChange={handleInputChange}
            placeholder="Введите URL изображения" />
          <Input
            type="text"
            name="name"
            label="Название"
            value={formData.name || ''}
            onChange={handleInputChange}
            placeholder="Введите название" />
          <Input
            type="text"
            name="description"
            label="Описание"
            value={formData.description || ''}
            onChange={handleInputChange}
            placeholder="Введите описание" />
          <Input
            type="number"
            name="price"
            label="Цена"
            value={formData.price || ''}
            onChange={handleInputChange}
            placeholder="Введите цену" />
          <Button onClick={handleSave}>Сохранить</Button>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          style={{ backgroundImage: `url(${svg})` }}
          className={styles.button}
        >
          {isEditing ? <span className={styles.buttonInfo}>Отмена</span> : <span className={styles.buttonInfo}>Редактировать</span>}
        </button></>
      ) : (
        <>
          <div>
            <img src={order?.imageUrl} alt={order?.name} className={styles.img} />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.itemInfo}>
              <div className={styles.title}>Название: <br />{order?.name}</div>
            </div>
            <div className={styles.itemInfo}>
              <div className={styles.description}>Описание: <br />{order?.description}</div>
            </div>
            <div className={styles.itemInfo}>
              <div className={styles.price}>Цена: <br />{order?.price}</div>
            </div>
            <div className={styles.itemNoFix}>
              <div className={styles.views}>Просмотры: {order?.views}</div>
              <div className={styles.likes}>Нравится: {order?.likes}</div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{ backgroundImage: `url(${svg})` }}
            className={styles.button}
          >
            {isEditing ? <span className={styles.buttonInfo}>Отмена</span> : <span className={styles.buttonInfo}>Редактировать</span>}
          </button>
        </>
      )}
    </main>
  );
};

export default AdvertisementPage;