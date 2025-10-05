import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import store from '../../services/store';
import {
  ConstructorPage,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  Feed,
  NotFound404
} from '@pages';
import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';
import '../../index.css';
import styles from './app.module.css';
import { FC } from 'react';

// Компонент для модального окна с ингредиентом
const IngredientModal: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Modal title='Детали ингредиента' onClose={handleClose}>
      <IngredientDetails />
    </Modal>
  );
};

// Компонент для модального окна с заказом
const OrderModal: FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Modal title='' onClose={handleClose}>
      <OrderInfo />
    </Modal>
  );
};

const App: FC = () => (
  <Provider store={store}>
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          {/* Основные маршруты */}
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route path='/feed/:number' element={<OrderInfo />} />
          <Route path='/profile/orders/:number' element={<OrderInfo />} />
          <Route path='*' element={<NotFound404 />} />

          {/* Маршруты для модальных окон */}
          <Route path='/ingredients/:id/modal' element={<IngredientModal />} />
          <Route path='/feed/:number/modal' element={<OrderModal />} />
          <Route
            path='/profile/orders/:number/modal'
            element={<OrderModal />}
          />
        </Routes>
      </div>
    </Router>
  </Provider>
);

export default App;
