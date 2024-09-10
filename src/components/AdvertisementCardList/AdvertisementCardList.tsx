import { Link } from 'react-router-dom';
import { Advertisment } from '../../utlis/types';
import AdvertisementCard from '../AdvertisementCard/AdvertisementCard';
import styles from './AdvertisementCardList.module.css';
import { memo } from 'react';

interface AdvertisementCardListProps {
  data: Advertisment[];
}

export const AdvertisementCardList: React.FC<AdvertisementCardListProps> = memo(
  ({ data }) => {
    return (
      <ul className={styles.list}>
        {data.map((item) => (
          <li key={item.id} className={styles.listItem}>
            <Link to={`/adv/${item.id}`} className={styles.link}>
              <AdvertisementCard {...item} />
            </Link>
          </li>
        ))}
      </ul>
    );
  }
);
