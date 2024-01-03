import axios from "axios";

export const getAllProducts = async () => await axios.get("http://localhost:8000/api/all-product");

export const getProducts = async (
  category_name: string | string[] | undefined,
  page: number,
  per_page: number,
  price: number[],
  ratings: number
) =>
  await axios.get("http://localhost:8000/api/products", {
    params: { category_name, page, per_page, price, ratings },
  });

export const getProductId = async (id: string) => await axios.get(`http://localhost:8000/api/products/${id}`);
