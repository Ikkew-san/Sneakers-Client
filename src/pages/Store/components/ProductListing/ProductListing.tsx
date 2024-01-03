import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { HeartOutlined, StarFilled } from "@ant-design/icons";
import { ConfigProvider, Pagination, PaginationProps } from "antd";
import { useProduct } from "../../../../context/ProductContext";
import { productType } from "../../../../types/productType";

const ProductListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, queryfilter, page, setPage, total } = useProduct();
  const navigate = useNavigate();

  const itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  return (
    <section className="w-auto mx-auto">
      {/* Filter */}
      <section className="grid grid-cols-4 gap-6 w-auto">
        {products?.map(({ _id, name, original_price, discounted_price, rating, reviews, img }: productType) => {
          return (
            <div key={_id} className="flex flex-col h-[305px]">
              <Link to={`/products/${_id}`} className="flex-1">
                <img src={img} alt={name} width={200} />
                <p className="font-semibold">{name}</p>
                <p>
                  <span className="text-red-500 line-through">${original_price.toLocaleString("en-US")}</span>{" "}
                  <span className="font-medium">${discounted_price.toLocaleString("en-US")}</span>
                </p>
                <p className="text-[11px]">
                  {rating + " "}
                  <StarFilled style={{ color: "gold" }} /> ({reviews.toLocaleString("en-US")} reviews)
                </p>
              </Link>
              <div className="flex items-center gap-4">
                <a className="bg-yellow-500 font-medium rounded-md flex-1 text-center py-2">Add to Cart</a>{" "}
                <a>
                  <HeartOutlined style={{ fontSize: "24px" }} />
                </a>
              </div>
            </div>
          );
        })}
      </section>
      <div className="text-center pt-6">
        <ConfigProvider
          theme={{
            token: { colorPrimary: "rgb(202,138,4)" },
          }}
        >
          <Pagination
            current={page}
            total={total}
            itemRender={itemRender}
            onChange={(page) => {
              queryfilter("page", page);
            }}
            pageSize={16}
            showSizeChanger={false}
          />
        </ConfigProvider>
      </div>
    </section>
  );
};

export default ProductListing;
