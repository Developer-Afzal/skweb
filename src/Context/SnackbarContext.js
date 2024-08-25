// SnackbarContext.js
import React, { createContext, useContext, useState } from 'react';
import { GetLogout } from '../features/LoginSlice';
import {store} from '../app/store'
import { Snackbar, Alert } from '@mui/material';
import axios from 'axios';
const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response && error.response.status === 401) {
        // Redirect to login page
        store.dispatch(GetLogout())
        window.location.href = '/' 
        showSnackbar('Your Token Has Expired', 'error' )
      }
      return Promise.reject(error);
    }
  );



  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
