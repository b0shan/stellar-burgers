import { useLocation, useNavigate } from 'react-router-dom';

export const usePopupPersistence = (popupType: string) => {
  const location = useLocation();
  const navigate = useNavigate();

  const savePopupState = (data?: any) => {
    sessionStorage.setItem('lastViewedPopup', popupType);
    sessionStorage.setItem('lastViewedPopupData', JSON.stringify(data || {}));
    sessionStorage.setItem('lastViewedPopupPath', location.pathname);
  };

  const restorePopup = () => {
    const savedPopupType = sessionStorage.getItem('lastViewedPopup');
    const savedData = sessionStorage.getItem('lastViewedPopupData');
    const savedPath = sessionStorage.getItem('lastViewedPopupPath');

    if (savedPopupType === popupType && savedPath === location.pathname) {
      const popupPath = getPopupPath(popupType, savedData);
      if (popupPath) {
        navigate(popupPath, {
          state: {
            background: location,
            ...(savedData && { data: JSON.parse(savedData) })
          }
        });
        return true;
      }
    }
    return false;
  };

  const clearPopupState = () => {
    sessionStorage.removeItem('lastViewedPopup');
    sessionStorage.removeItem('lastViewedPopupData');
    sessionStorage.removeItem('lastViewedPopupPath');
  };

  const getPopupPath = (type: string, data: any) => {
    const parsedData = data ? JSON.parse(data) : {};

    switch (type) {
      case 'order':
        return location.pathname.includes('/profile/orders')
          ? `/profile/orders/${parsedData.number}`
          : `/feed/${parsedData.number}`;
      case 'ingredient':
        return `/ingredients/${parsedData.id}`;
    }
  };

  return {
    savePopupState,
    restorePopup,
    clearPopupState,
    getPopupPath
  };
};
