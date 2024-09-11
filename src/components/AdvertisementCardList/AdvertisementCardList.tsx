import { Link } from 'react-router-dom';
import { Advertisment } from '../../utlis/types';
import AdvertisementCard from '../AdvertisementCard/AdvertisementCard';
import styles from './AdvertisementCardList.module.css';
import { memo, useState } from 'react';
import { advertisementService } from '../../shared/api/AdvertisementService';
import ErrorNotification from '../ErrorNotification/ErrorNotification';

interface AdvertisementCardListProps {
  data: Advertisment[];
}

export const AdvertisementCardList: React.FC<AdvertisementCardListProps> = memo(
  ({ data }) => {
    const [advertisements, setAdvertisements] = useState<Advertisment[]>(data);
    const [error, setError] = useState<string>('');

    const handleDelete = async (event: React.MouseEvent, id: string) => {
      event.stopPropagation();
      event.preventDefault();
      setError('');
      try {
        await advertisementService.deleteAdvertisement(id);
        setAdvertisements((prev) => prev.filter((ad) => ad.id !== id));
      } catch (error) {
        setError('Не удалось удалить');
      }
    };

    return (
      <ul className={styles.list}>
        {error && <ErrorNotification message={error} />}
        {advertisements.map((item) => (
          <li key={item.id} className={styles.listItem}>
            <Link to={`/adv/${item.id}`} className={styles.link}>
              <AdvertisementCard {...item} onDelete={handleDelete} />
            </Link>
          </li>
        ))}
      </ul>
    );
  }
);
