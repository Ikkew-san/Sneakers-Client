// import { initialState } from "../reducer/ProductReducer";
import { productType } from "./productType";

export type ProductContextType = {
  products?: productType[];
  getAPIProducts: () => void;
  queryfilter: (key: string, value: any) => void;
  setPageName: (pageName: string) => void;
  page?: number;
  setPage: (page: number) => void;
  maxPrice?: number;
  total?: number;
};
