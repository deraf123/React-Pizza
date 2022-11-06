import React from 'react';
import s from './Search.module.scss';

export const Search = ({ setSearchValue, searchValue }) => {
  return (
    <input
      onChange={(event) => setSearchValue(event.target.value)}
      className={s.root}
      value={searchValue}
      placeholder='Поиск пиццы...'></input>
  );
};
