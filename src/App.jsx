import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
import spinner from '../src/assets/spinner1.gif';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'>
      <Header />
      <main className='flex-1 pt-12'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className='flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900'>
    <img src={spinner} alt="Loading..." className="w-64 h-64" />
    </div>
  );
}

export default App;
