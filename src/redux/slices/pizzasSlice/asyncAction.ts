import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchPizzasArgs, PizzaItemType } from "./types";

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasArgs) => {
    const { categoryId, sortBy, search, currentPage } = params;
    const { data } = await axios.get<PizzaItemType[]>(
      `https://63622bc666f75177ea284f2e.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }${search}&sortBy=${sortBy}&order=desc`,
    );
    return data as PizzaItemType[];
  },
);
