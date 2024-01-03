import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { getProducts } from "../services/product-services/productService";
import { ProductContextType } from "../types/ProductContextType";
import { initialState, ProductReducer, ReducerActionType } from "../reducer/ProductReducer";
import { useSearchParams } from "react-router-dom";

const ProductContext = createContext({} as ProductContextType);

type ProductContextProvider = {
  children: React.ReactNode;
};

export const ProductContextProvider = ({ children }: ProductContextProvider) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState();

  // const { ratings, price, categories } = state.filters;
  const [pageName, setPageName] = useState<string>();
  const [page, setPage] = useState<number>(Number(searchParams.get("page")) || 1);
  const [maxPrice, setMaxPrice] = useState<number>();
  const [total, setTotal] = useState<number>();

  const getAPIProducts = async () => {
    const categories = searchParams.get("categories")?.split(",");
    const price = searchParams.get("price")?.split(",");
    const ratings = searchParams.get("ratings");
    try {
      const response = await getProducts(categories, page, 16, price, ratings);
      setProducts(response.data.products);
      dispatch({
        type: ReducerActionType.GET_PRODUCTS,
        payload: response.data.products,
      });
      //     setProducts(response.data.products);
      console.log(response.data);

      setMaxPrice(response.data.maxPrice);
      setTotal(response.data.total_products);
      // setPage(parseInt(response.data.page));
      //     setFilter(response.data.filter);
    } catch (error) {
      console.log(error);
    }
  };

  const queryfilter = (key: string, value: any) => {
    setSearchParams((params) => {
      params.set(key, value.toString());
      return params;
    });
  };

  useEffect(() => {
    getAPIProducts();
    queryfilter("categories", ["men", "kid"]);
    queryfilter("price", [500, 1000]);
    queryfilter("ratings", 5);
    queryfilter("page", 1);
  }, [pageName]);

  return (
    <ProductContext.Provider
      value={{
        products,
        queryfilter,
        state,
        getAPIProducts,
        setPageName,
        page,
        setPage,
        maxPrice,
        total,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
