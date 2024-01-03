import { useEffect } from "react";
import Filter from "./components/Filter/Filter";
import ProductListing from "./components/ProductListing/ProductListing";
import { useProduct } from "../../context/ProductContext";

type Props = {
  pageName: string;
};

const Store: React.FC<Props> = ({ pageName }) => {
  const { setPageName } = useProduct();

  useEffect(() => {
    setPageName(pageName);
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pageName]);

  return (
    <article className="bg-white max-w-screen-xl mx-auto p-6">
      <div className="flex flex-row gap-8">
        <Filter category={pageName} />
        <ProductListing />
      </div>
    </article>
  );
};

export default Store;
