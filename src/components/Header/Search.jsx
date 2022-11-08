import React from 'react';
import { useContext } from 'react';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';
import s from './Search.module.scss';
import { useState } from 'react';
import { useCallback } from 'react';

export const Search = () => {
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(SearchContext);
  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 700),
    [],
  );
  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  return (
    <input
      onChange={onChangeInput}
      className={s.root}
      value={value}
      placeholder='Поиск пиццы...'></input>
  );
};
