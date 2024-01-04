import { ConfigProvider, Slider } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useProduct } from "../../../../context/ProductContext";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

type Props = {
  category: string;
};

const Filter: React.FC<Props> = ({ category }) => {
  const [searchParams] = useSearchParams();
  const { queryfilter, maxPrice, categories, setCategories } = useProduct();
  // const [categories] = useState(searchParams.get("categories")?.split(","));
  const [price] = useState(
    searchParams
      .get("price")
      ?.split(",")
      .map((val) => {
        return parseInt(val);
      })
  );
  const ratings = searchParams.get("ratings");

  const changeCategories = async (value, action) => {
    if (action) {
      setCategories([...categories, value]);
    } else {
      setCategories(categories?.filter((val) => val != value));
    }
    queryfilter("categories", categories);
  };

  return (
    <>
      <aside className="flex flex-col gap-6 max-lg:hidden min-w-[230px]">
        {/* Categories */}
        <section className={`${category != "" ? "hidden" : ""} `}>
          <p className="text-xl font-semibold mb-3">Categories</p>
          <div className="flex flex-col space-y-2">
            <label className="flex justify-between">
              <span>Men's wear</span>
              <input
                type="checkbox"
                name="categories"
                value="men"
                defaultChecked={categories?.includes("men")}
                onChange={(e) => {
                  changeCategories(e.target.value, e.target.checked);
                }}
              />
            </label>
            <label className="flex justify-between">
              <span>Women's wear</span>
              <input
                type="checkbox"
                name="categories"
                value="women"
                defaultChecked={categories?.includes("women")}
                onChange={(e) => {
                  changeCategories(e.target.value, e.target.checked);
                }}
              />
            </label>
            <label className="flex justify-between">
              <span>Kid's wear</span>
              <input
                type="checkbox"
                name="categories"
                value="kid"
                defaultChecked={categories?.includes("kid")}
                onChange={(e) => {
                  changeCategories(e.target.value, e.target.checked);
                }}
              />
            </label>
          </div>
        </section>

        {/* Price */}
        <section>
          <p className="text-xl font-semibold mb-3">Price</p>
          <div className="flex flex-col">
            <ConfigProvider
              theme={{
                token: { colorPrimary: "rgb(202,138,4)" },
              }}
            >
              <Slider
                range
                max={maxPrice}
                defaultValue={price}
                onChange={(e) => {
                  //   setPrice(e);
                  console.log(e);
                }}
              />
            </ConfigProvider>
            <div className="flex justify-between">
              <span>$0</span>
              <span>${maxPrice?.toLocaleString("en-US")}</span>
            </div>
          </div>
        </section>

        {/* Ratings */}
        <section>
          <p className="text-xl font-semibold mb-3">Ratings</p>
          <div className="flex flex-col space-y-2">
            <div className={`flex justify-between pl-2  border-l-[6px] ${ratings == "1" ? "border-yellow-400" : ""}`}>
              <a>
                <span className="space-x-1">
                  <StarFilled style={{ color: "gold" }} />
                  <StarOutlined />
                  <StarOutlined />
                  <StarOutlined />
                  <StarOutlined />
                  {" or more"}
                </span>
              </a>
            </div>
            <div className={`flex justify-between pl-2  border-l-[6px] ${ratings == "2" ? "border-yellow-400" : ""}`}>
              <a>
                <span className="space-x-1">
                  <StarFilled style={{ color: "gold" }} />
                  <StarFilled style={{ color: "gold" }} />
                  <StarOutlined />
                  <StarOutlined />
                  <StarOutlined />
                  {" or more"}
                </span>
              </a>
            </div>
            <div className={`flex justify-between pl-2  border-l-[6px] ${ratings == "3" ? "border-yellow-400" : ""}`}>
              <a>
                <span className="space-x-1">
                  <StarFilled style={{ color: "gold" }} />
                  <StarFilled style={{ color: "gold" }} />
                  <StarFilled style={{ color: "gold" }} />
                  <StarOutlined />
                  <StarOutlined />
                  {" or more"}
                </span>
              </a>
            </div>
            <div className={`flex justify-between pl-2  border-l-[6px] ${ratings == "4" ? "border-yellow-400" : ""}`}>
              <a>
                <span className="space-x-1">
                  <StarFilled style={{ color: "gold" }} />
                  <StarFilled style={{ color: "gold" }} />
                  <StarFilled style={{ color: "gold" }} />
                  <StarFilled style={{ color: "gold" }} />
                  <StarOutlined />
                  {" or more"}
                </span>
              </a>
            </div>
            <div
              className={`flex justify-between items-center pl-2  border-l-[6px] ${
                ratings == "5" ? "border-yellow-400" : ""
              }`}
            >
              <a>
                <span className="space-x-1">
                  <StarFilled style={{ color: "gold" }} />
                  <StarFilled style={{ color: "gold" }} />
                  <StarFilled style={{ color: "gold" }} />
                  <StarFilled style={{ color: "gold" }} />
                  <StarFilled style={{ color: "gold" }} />
                </span>
              </a>
            </div>
          </div>
        </section>
      </aside>
    </>
  );
};

export default Filter;
