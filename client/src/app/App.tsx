import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Result from '../pages/Result';
import Credit from '../pages/Credit';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Login from '../components/Login';
import { useAppDispatch, useAppSelector } from './hooks';
import { toast, ToastContainer } from 'react-toastify';
import { useUnknowncreditQuery } from '../features/user/userApi';
import { setCredit, setUser } from '../features/user/user';

const App: React.FC = () => {
  const showLogin = useAppSelector(state => state.user.showLogin);
  const token = useAppSelector(state => state.user.token);

  const dispatch = useAppDispatch();

  const { refetch } = useUnknowncreditQuery();

  const loadUnknownCredit = async () => {
    const res = await refetch();

    if ('data' in res) {
      dispatch(setCredit(res.data?.uc));
      dispatch(setUser(res?.data?.user))
    } else if ('error' in res) {
      const err = res.error as any;
      console.error('Cannot get uc', err);
      toast.error(err?.data?.message || 'Something went wrong');
    }
  }

  useEffect(() => {
    if (token)
      loadUnknownCredit();
  }, [token])

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-black via-gray-900 to-orange-600'>
      <Navbar />
      {
        showLogin && <Login />
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/text-to-image' element={<Result />} />
        <Route path='/buy-unknown-credit' element={<Credit />} />
        <Route path='*' element={<h1 style={{ height: '70vh', color: 'white'}}>404 Not Found!</h1>} />
      </Routes>
      <Footer />
      <ToastContainer
        position='bottom-right'
      />
    </div>
  )
}

export default App;
