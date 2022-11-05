import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Categories } from '../components/Categories/Categories';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Sort } from '../components/Sort/Sort';

export const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSrtType] = useState({ name: 'популярности', sortProperty: 'rating' });
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://63622bc666f75177ea284f2e.mockapi.io/items?${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType.sortProperty}&order=desc`,
      )
      .then(({ data }) => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onclickCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onclickSortType={(id) => setSrtType(id)} />
      </div>
      <h2 class='content__title'>Все пиццы</h2>
      <div class='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};
