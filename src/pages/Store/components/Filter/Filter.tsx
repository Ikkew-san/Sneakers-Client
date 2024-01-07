import { useEffect, useState } from "react";
import { ConfigProvider, Slider } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useProduct } from "../../../../context/ProductContext";
import { useSearchParams } from "react-router-dom";

type Props = {
  category: string;
};

const Filter: React.FC<Props> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { queryfilter, maxPrice, categories, setCategories, ratings, setRatings } = useProduct();
  const [iPrice, setIPrice] = useState<number[]>([0, 0]);

  const changeCategories = (value: string, action: boolean) => {
    const data: string[] | undefined = action
      ? [...(categories ?? ""), value]
      : categories?.filter((val) => val != value);
    if (data?.length != 0) {
      queryfilter("categories", data);
    } else {
      searchParams.delete("categories");
      setSearchParams(searchParams);
    }
    setCategories(data!);
  };

  const changeRatings = (num: number) => {
    if (ratings != num) {
      setRatings(num);
      queryfilter("ratings", num);
    } else {
      setRatings(0);
      searchParams.delete("ratings");
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    if (!searchParams.get("categories")) setCategories([]);
    if (!searchParams.get("ratings")) setRatings(0);

    const price = async () => {
      const data = await [0, maxPrice!];
      console.log(maxPrice);

      if (!searchParams.get("price")) setIPrice(data);
    };
    price();
  }, [category]);

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
                checked={categories?.includes("men")}
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
                checked={categories?.includes("women")}
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
                checked={categories?.includes("kid")}
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
                defaultValue={[0, maxPrice!]}
                value={iPrice}
                onChange={(e) => setIPrice(e)}
                onAfterChange={(e) => {
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
            <div className={`flex justify-between pl-2  border-l-[6px] ${ratings == 1 ? "border-yellow-400" : ""}`}>
              <a onClick={() => changeRatings(1)}>
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
            <div className={`flex justify-between pl-2  border-l-[6px] ${ratings == 2 ? "border-yellow-400" : ""}`}>
              <a onClick={() => changeRatings(2)}>
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
            <div className={`flex justify-between pl-2  border-l-[6px] ${ratings == 3 ? "border-yellow-400" : ""}`}>
              <a onClick={() => changeRatings(3)}>
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
            <div className={`flex justify-between pl-2  border-l-[6px] ${ratings == 4 ? "border-yellow-400" : ""}`}>
              <a onClick={() => changeRatings(4)}>
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
                ratings == 5 ? "border-yellow-400" : ""
              }`}
            >
              <a onClick={() => changeRatings(5)}>
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
