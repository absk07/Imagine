import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Result from '../pages/Result';
import Credit from '../pages/Credit';
import Navbar from '../components/Navbar';

const App: React.FC = () => {
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy-unknown-credit' element={<Credit />} />
        <Route path='*' element={<h1>404 Not Found!</h1>} />
      </Routes>
    </div>
  )
}

export default App;
