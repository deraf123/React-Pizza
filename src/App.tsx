import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
// import { Cart } from '';
import './scss/app.scss';
import { MainLayout } from './layout/MainLayout';

const Cart = React.lazy(() => import('./pages/Cart'));
const FullPizza = React.lazy(() => import('./pages/FullPizza'));
const NotFounder = React.lazy(() => import('./pages/NotFounder'));
function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route
          path='/cart'
          element={
            <React.Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path='/pizza/:pizzaId'
          element={
            <React.Suspense fallback={<div>Загрузка...</div>}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route
          path='*'
          element={
            <React.Suspense fallback={<div>Загрузка...</div>}>
              <NotFounder />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
