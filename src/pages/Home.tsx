import React, { useCallback, useEffect, useRef } from 'react';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Categories } from '../components/Categories/Categories';
import { Pagination } from '../components/Pagination/Pagination';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Sort, sortList } from '../components/Sort/Sort';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice/slice';
import { fetchPizzas } from '../redux/slices/pizzasSlice/asyncAction';
import { FetchPizzasArgs } from '../redux/slices/pizzasSlice/types';
import { useAppDispatch } from '../redux/store';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearach = useRef(false);
  const isMounted = useRef(false);
  const searchValue = useSelector((state: any) => state.filterSlice.searchValue);
  const categoryId = useSelector((state: any) => state.filterSlice.categoryId);
  const sortType = useSelector((state: any) => state.filterSlice.sort.sortProperty);
  const currentPage = useSelector((state: any) => state.filterSlice.currentPage);
  const { items, status } = useSelector((state: any) => state.pizzasSlice);

  const onclickCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const getFetchPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : '';
    const sortBy = sortType.sortProperty;
    dispatch(fetchPizzas({ categoryId, sortBy, search, currentPage }));

    window.scrollTo(0, 0);
  };
  /// Если изменили параметры
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortType,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortType, currentPage]);
  // /// Первый рендер проверка URL сохранение в redux
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as FetchPizzasArgs;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
  //     console.log(sortList[0])
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: params.categoryId,
  //         currentPage: Number(params.currentPage)
  //         sort: sort || sortList[0]
  //       }),
  //     );
  //   }
  //   isSearach.current = true;
  // }, []);
  useEffect(() => {
    getFetchPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzaItem = items?.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  console.log(sortType, 'sortType');
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onclickCategory={onclickCategory} />
        <Sort sortValue={sortType} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла Ошибка</h2>
          <p>Не удалось получить пиццы, Попробуйде позже</p>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeletons : pizzaItem}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
