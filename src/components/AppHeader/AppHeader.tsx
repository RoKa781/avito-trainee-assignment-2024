import { NavLink } from 'react-router-dom';
import styles from './AppHeader.module.css';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <NavLink
          to="/adv"
          className={({ isActive }) =>
            isActive ? styles.link_active : styles.link
          }
        >
          <p>Объявления</p>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? styles.link_active : styles.link
          }
        >
          <p>Заказы</p>
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
