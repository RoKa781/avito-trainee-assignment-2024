import { useParams } from 'react-router-dom';
import { Preloader } from '../../components/Preloader/Preloader';
import Input from '../../components/Input/Input';
import styles from './AdvertisementPage.module.css';
import Button from '../../components/Button/Button';
import svg from '../../images/pencil-svgrepo-com.svg';
import ErrorNotification from '../../components/ErrorNotification/ErrorNotification';
import { useAdvertisement } from '../../shared/hooks/useAdvertisement';
import { Helmet } from 'react-helmet-async';

const AdvertisementPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    order,
    formData,
    isLoading,
    error,
    isEditing,
    handleInputChange,
    handleSave,
    setIsEditing,
  } = useAdvertisement(id as string);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <main className={styles.main}>
      <Helmet>
        <title>{order?.name}</title>
      </Helmet>
      {error && (
        <ErrorNotification 
          message={error}
        />
      )}
      {isEditing ? (
        <>
          <div className={styles.editForm}>
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
            <Button onClick={() => handleSave(id as string)}>Сохранить</Button>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={styles.button}
          >
            <img src={svg} alt="Edit" />
            {isEditing ? <span className={styles.buttonInfo}>Отмена</span> : <span className={styles.buttonInfo}>Редактировать</span>}
          </button>
        </>
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
            className={styles.button}
          >
            <img src={svg} alt="Edit" />
            {isEditing ? <span>Отмена</span> : <span>Редактировать</span>}
          </button>
        </>
      )}
    </main>
  );
};

export default AdvertisementPage;
