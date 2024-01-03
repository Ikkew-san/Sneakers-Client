import { productType } from "../types/productType";

export const initialState: InitialStateType = {
  products: [],
  inputSearch: "",
  filters: {
    categories: [],
    price: [],
    ratings: 0,
    // sort: "",
  },
};

export enum ReducerActionType {
  GET_PRODUCTS,
  SEARCH,
  ADD_CATEGORIES,
  ADD_PRICE,
  ADD_RATINGS,
  // ADD_SORT,
  RESET,
}

type InitialStateType = {
  products: productType[];
  inputSearch: string;
  filters: {
    categories?: string[];
    price?: number[];
    ratings?: number;
    //     sort: string;
  };
};

export type ReducerAction = {
  type: ReducerActionType;
  payload: any;
};

export const ProductReducer = (state: InitialStateType, action: ReducerAction) => {
  switch (action.type) {
    case ReducerActionType.GET_PRODUCTS:
      return { ...state, products: action.payload };
    case ReducerActionType.ADD_CATEGORIES: {
      return { ...state, filters: { categories: action.payload } };
    }
    case ReducerActionType.ADD_RATINGS:
      return { ...state, filters: { ratings: action.payload } };
    case ReducerActionType.ADD_PRICE:
      return { ...state, filters: { price: action.payload } };
    case ReducerActionType.RESET:
      return initialState;
    default:
      return state;
  }
};
