import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Categories } from '../components/Categories/Categories';
import { Pagination } from '../components/Pagination/Pagination';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Sort, sortList } from '../components/Sort/Sort';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearach = useRef(false);
  const isMounted = useRef(false);
  const searchValue = useSelector((state) => state.filterSlice.searchValue);
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);
  const currentPage = useSelector((state) => state.filterSlice.currentPage);
  const { items, status } = useSelector((state) => state.pizzasSlice);

  const onclickCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };
  const getFetchPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : '';
    const sortTypes = sortType.sortProperty;
    dispatch(fetchPizzas({ categoryId, sortTypes, search, currentPage }));

    window.scrollTo(0, 0);
  };
  /// Если изменили параметры
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);
  /// Первый рендер проверка URL сохранение в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortType);
      dispatch(setFilters({ ...params, sort }));
    }
    isSearach.current = true;
  }, []);
  useEffect(() => {
    getFetchPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzaitem = items?.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onclickCategory={onclickCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла Ошибка</h2>
          <p>Не удалось получить пиццы, Попробуйде позже</p>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeletons : pizzaitem}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
