export type FetchPizzasArgs = {
  categoryId: number;
  sortBy: string;
  search: string;
  currentPage: string;
};

export type PizzaItemType = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
};
export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
export interface PizzaSliceState {
  items: PizzaItemType[];
  status: Status;
}
