import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import WrapperPage from '../WrapperPage/WrapperPage';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <WrapperPage>
      <Link to="/adv" className={styles.link}>
        <Button>На главную</Button>
      </Link>
      <h2>Ничего не найдено</h2>
    </WrapperPage>
  );
};

export default NotFound;
