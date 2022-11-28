import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import NotFounder from './pages/NotFounder';
import './scss/app.scss';
import { createContext, useState } from 'react';
import { FullPizza } from './pages/FullPizza';
import { MainLayout } from './layout/MainLayout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/pizza/:pizzaId' element={<FullPizza />} />
        <Route path='*' element={<NotFounder />} />
      </Route>
    </Routes>
  );
}

export default App;
