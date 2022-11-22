import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import NotFounder from './pages/NotFounder';
import './scss/app.scss';
import { createContext, useState } from 'react';


function App() {
  return (
    <div className='wrapper'>
        <Header />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFounder />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
