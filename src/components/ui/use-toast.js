import { useState, useCallback } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = 'default' }) => {
    setToasts((currentToasts) => [
      ...currentToasts,
      {
        id: Date.now(),
        title,
        description,
        variant,
      },
    ]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  return {
    toast,
    toasts,
    dismissToast,
  };
}