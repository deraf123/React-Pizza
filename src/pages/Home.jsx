import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchContext } from '../App';
import { Categories } from '../components/Categories/Categories';
import { Pagination } from '../components/Pagination/Pagination';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Sort } from '../components/Sort/Sort';
import { setCategoryId } from '../redux/slices/filterSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchValue } = useContext(SearchContext);

  const onclickCategory = (id) => {
    console.log(id);
    dispatch(setCategoryId(id));
  };

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
        <Categories value={categoryId} onclickCategory={onclickCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : items}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};
