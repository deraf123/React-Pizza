import React from 'react';
import debounce from 'lodash.debounce';
import s from './Search.module.scss';
import { useState } from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 200),
    [],
  );
  const onChangeInput = (event: any) => {
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
