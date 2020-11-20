import React, { createContext, useCallback, useContext } from 'react';
import ToastContainer from '../components/ToastContainer';

interface ToastContextPorps {
  addToast(): void;
  removeToast(): void;
}

const ToastContext = createContext<ToastContextPorps>({} as ToastContextPorps);

export const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('addToast');
  }, []);
  const removeToast = useCallback(() => {
    console.log('removeToast');
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextPorps {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export default useToast;
