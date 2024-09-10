import { useState, useRef, useEffect } from 'react';
import styles from './Filters.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import classNames from 'classnames';

interface FiltersProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterParams: {
    price?: string;
    views?: string;
    likes?: string;
  };
  applyFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({ handleInputChange, filterParams, applyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={classNames(styles.filter, { [styles.filterActive]: isOpen })}
      tabIndex={0}
      onClick={() => setIsOpen(prev => !prev)}
      ref={containerRef}
    >
      {isOpen && (
        <div
          className={styles.filtersContainer}
          onClick={handleContainerClick}
        >
          <Input
            name='price'
            label='Цена'
            type='number'
            value={filterParams.price || ''}
            onChange={handleInputChange}
          />
          <Input
            name='views'
            label='Просмотры'
            type='number'
            value={filterParams.views || ''}
            onChange={handleInputChange}
          />
          <Input
            name='likes'
            label='Лайки'
            type='number'
            value={filterParams.likes || ''}
            onChange={handleInputChange}
          />
          <Button onClick={applyFilters} className={styles.button}>Применить</Button>
        </div>
      )}
      Фильтр
    </div>
  );
};

export default Filters;



