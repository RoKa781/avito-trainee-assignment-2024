import './App.css';
import AppHeader from './components/AppHeader/AppHeader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdvertisementsPage from './pages/AdvertisementsPage/AdvertisementsPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import AdvertisementPage from './pages/AdvertisementPage/AdvertisementPage';

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <div className='content'>
        <Routes>
          <Route path='/adv' element={<AdvertisementsPage />} />
          <Route path='/adv/:id' element={<AdvertisementPage />} />
          <Route path='/orders' element={<OrdersPage />} />
          <Route path='/orders/:id' element={<OrdersPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
