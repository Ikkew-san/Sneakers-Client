import React, { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductContextType } from "../types/ProductContextType";
import { productType } from "../types/productType";
import { getProducts } from "../services/product-services/productService";

const ProductContext = createContext({} as ProductContextType);

type ProductContextProvider = {
  children: React.ReactNode;
};

export const ProductContextProvider = ({ children }: ProductContextProvider) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<productType[]>();
  const [pageName, setPageName] = useState<string>();
  const [page, setPage] = useState<number>(Number(searchParams.get("page")) || 1);
  const [categories, setCategories] = useState(searchParams.get("categories")?.split(",") || []);

  const [maxPrice, setMaxPrice] = useState<number>();
  const [total, setTotal] = useState<number>();

  const getAPIProducts = async () => {
    // const categories = pageName != "" ? pageName : searchParams.get("categories")?.split(",");

    const price = searchParams
      .get("price")
      ?.split(",")
      .map((val) => {
        return parseInt(val);
      }) || [0, 0];
    const ratings = Number(searchParams.get("ratings"));
    try {
      const response = await getProducts(categories, page, 16, price, ratings);
      console.log(response.data);
      setProducts(response.data.products);
      setMaxPrice(response.data.maxPrice);
      setTotal(response.data.total_products);
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
  }, [pageName, page, categories]);

  return (
    <ProductContext.Provider
      value={{
        products,
        getAPIProducts,
        queryfilter,
        setPageName,
        page,
        setPage,
        categories,
        setCategories,
        maxPrice,
        total,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
