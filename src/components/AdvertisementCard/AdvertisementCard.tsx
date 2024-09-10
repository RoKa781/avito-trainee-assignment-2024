import { useNavigate } from 'react-router-dom';
import { Advertisment } from '../../utlis/types';
import Button from '../Button/Button';
import styles from './AdvertisementCard.module.css';

const AdvertisementCard: React.FC<Advertisment> = ({ imageUrl, name, price, views, likes, id }) => {
  const navigate = useNavigate();

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    navigate(`/orders/${id}`);
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
    </article>
  );
};

export default AdvertisementCard;
