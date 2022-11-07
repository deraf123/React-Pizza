import React from 'react';
import { useContext } from 'react';
import { SearchContext } from '../../App';
import s from './Search.module.scss';

export const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  return (
    <input
      onChange={(event) => setSearchValue(event.target.value)}
      className={s.root}
      value={searchValue}
      placeholder='Поиск пиццы...'></input>
  );
};
