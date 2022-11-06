import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import NotFounder from './pages/NotFounder';
import './scss/app.scss';
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div class='wrapper'>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div class='content'>
        <Routes>
          <Route path='/' element={<Home searchValue={searchValue}/>} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFounder />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
