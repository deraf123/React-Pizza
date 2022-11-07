import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { SearchContext } from '../App';
import { Categories } from '../components/Categories/Categories';
import { Pagination } from '../components/Pagination/Pagination';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Sort } from '../components/Sort/Sort';

export const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSrtType] = useState({ name: 'популярности', sortProperty: 'rating' });
  const { searchValue } = useContext(SearchContext);
  useEffect(() => {
    setIsLoading(true);

    const search = searchValue ? `&search=${searchValue}` : '';
    axios
      .get(
        `https://63622bc666f75177ea284f2e.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }${search}&sortBy=${sortType.sortProperty}&order=desc`,
      )
      .then(({ data }) => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const items = pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onclickCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onclickSortType={(id) => setSrtType(id)} />
      </div>
      <h2 class='content__title'>Все пиццы</h2>
      <div class='content__items'>{isLoading ? skeletons : items}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};
