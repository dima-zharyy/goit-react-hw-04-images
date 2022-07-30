import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const Notification = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      style={{ top: 0 }}
    />
  );
};

export const notify = message => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
