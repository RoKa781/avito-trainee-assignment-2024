import { useNavigate } from 'react-router-dom';
import { Advertisment } from '../../utlis/types';
import Button from '../Button/Button';
import styles from './AdvertisementCard.module.css';
import svg from '../../images/delete-button-svgrepo-com.svg';

interface AdvertisementCardProps extends Advertisment {
  onDelete: (event: React.MouseEvent, id: string) => Promise<void>;
}

const AdvertisementCard: React.FC<AdvertisementCardProps> = ({
  imageUrl,
  name,
  price,
  views,
  likes,
  id,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    navigate(`/orders/${id}`);
  };

  const handleDeleteButtonClick = (event: React.MouseEvent) => {
    onDelete(event, id);
  };

  return (
    <article className={styles.adv}>
      <img src={imageUrl} alt={name} className={styles.adv__img} />
      <div className={styles.adv__containerTitle}>
        <h2 className={styles.adv__title}>{name}</h2>
        <p className={styles.adv__price}>{price} руб.</p>
      </div>
      <div className={styles.adv__containerinfo}>
        <span>Просмотры: {views}</span>
        <span>Лайки: {likes}</span>
      </div>
      <Button onClick={handleButtonClick} className={styles.button}>
        Перейти к заказам
      </Button>
      <button className={styles.deleteButton} onClick={handleDeleteButtonClick}>
        <img src={svg} alt="Delete" className={styles.deleteImg} />
      </button>
    </article>
  );
};

export default AdvertisementCard;
