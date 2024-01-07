import { productType } from "./productType";

export type ProductContextType = {
  products?: productType[];
  getAPIProducts: () => void;
  queryfilter: (key: string, value: any) => void;
  setPageName: (pageName: string) => void;
  page?: number;
  setPage: (page: number) => void;
  ratings?: number;
  setRatings: (ratings: number) => void;
  categories?: string[];
  setCategories: (categories: string[]) => void;
  maxPrice?: number;
  total?: number;
};
