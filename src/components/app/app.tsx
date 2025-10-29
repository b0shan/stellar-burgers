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
import { ProtectedRoute } from '../protected-route/protected-route';
import '../../index.css';
import styles from './app.module.css';
import { FC, useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getUser, fetchIngredients } from '../../slices/burgerSlice';
import { getCookie } from '../../utils/cookie';

// Универсальный компонент для модального окна с ингредиентом
const IngredientModal: FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Modal title='Детали ингредиента' onClose={handleClose}>
      <IngredientDetails />
    </Modal>
  );
};

// Универсальный компонент для модального окна с заказом
const OrderModal: FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    sessionStorage.removeItem('lastViewedOrder');
    sessionStorage.removeItem('lastViewedOrderPath');
    navigate(-1);
  };

  return (
    <Modal title='' onClose={handleClose}>
      <OrderInfo />
    </Modal>
  );
};

const AppContent: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());

    if (getCookie('accessToken')) {
      dispatch(getUser());
    }

    if (!background) {
      const lastOrderNumber = sessionStorage.getItem('lastViewedOrder');
      const lastOrderPath = sessionStorage.getItem('lastViewedOrderPath');

      if (lastOrderNumber && lastOrderPath) {
        const currentPath = location.pathname;
        const isOnFeed = currentPath === '/feed';
        const isOnProfileOrders = currentPath === '/profile/orders';
        const wasOnFeed = lastOrderPath === '/feed';
        const wasOnProfileOrders = lastOrderPath === '/profile/orders';

        if (
          (isOnFeed && wasOnFeed) ||
          (isOnProfileOrders && wasOnProfileOrders)
        ) {
          const modalPath = wasOnFeed
            ? `/feed/${lastOrderNumber}`
            : `/profile/orders/${lastOrderNumber}`;

          navigate(modalPath, {
            state: { background: location }
          });
        }
      }
    }
  }, [dispatch, navigate, location, background]);

  return (
    <div className={styles.app}>
      <AppHeader />

      {/* Основные маршруты */}
      <Routes location={background || location}>
        {/* Публичные маршруты */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />

        {/* Защищенные маршруты - только для неавторизованных */}
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        {/* Защищенные маршруты - только для авторизованных */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route path='/ingredients/:id' element={<IngredientModal />} />
          <Route path='/feed/:number' element={<OrderModal />} />
          <Route path='/profile/orders/:number' element={<OrderModal />} />
        </Routes>
      )}
    </div>
  );
};

const App: FC = () => (
  <Provider store={store}>
    <Router>
      <AppContent />
    </Router>
  </Provider>
);

export default App;
