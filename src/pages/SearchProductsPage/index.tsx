/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ProductItem from "../../components/ProductItem";
import "./ListProduct.css";
import { IProduct } from "../../interfaces/product";
import { ICategory } from "../../interfaces/category";
import { getAllProducts } from "../../services/product";
import { getAllCategories } from "../../services/category";
import { useSearchParams } from "react-router-dom";

const SearchProductsPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [categoryIds.length, name]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts({
        categoryId: categoryIds,
        name_like: name,
      });
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onCategoryClick = (categoryId: string) => {
    if (categoryIds.includes(categoryId)) {
      setCategoryIds(categoryIds.filter((it) => it !== categoryId));
    } else {
      setCategoryIds([...categoryIds, categoryId]);
    }
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-3">
        <div className="flex gap-x-14 mt-8">
          {categories.map((it) => (
            <div
              key={it.id}
              className="rounded px-3 py-2 bg-[#D2E8CD] flex items-center gap-x-2"
            >
              <img
                src="/images/category-image-3.png"
                alt="Thumbnail"
                className="block h-12 object-contain"
              />

              <p className="font-medium text-[#665345]">{it.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 flex gap-x-8">
          <div className="flex-1">
            <div className="flex gap-x-8">
              <div className="flex items-center gap-x-3">
                <p className="text-lg text-[#333333]">Sort By:</p>

                <select
                  name=""
                  id=""
                  className="rounded border border-[#BDBDBD] px-3 py-1.5 w-52 outline-none text-[#BDBDBD]"
                >
                  <option value="Newest">Newest</option>
                </select>
              </div>

              <div className="flex items-center gap-x-3">
                <p className="text-lg text-[#333333]">Show:</p>

                <select
                  name=""
                  id=""
                  className="rounded border border-[#BDBDBD] px-3 py-1.5 w-52 outline-none text-[#BDBDBD]"
                >
                  <option value="Default">Default</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-3 gap-y-14 my-12">
              {products.map((it) => (
                <ProductItem key={it.id} data={it} />
              ))}
            </div>
          </div>

          <div className="w-60">
            <p className="baloo-font text-3xl text-[#505F4E] font-bold">
              Kategorien
            </p>

            <ul className="mt-7">
              {categories.map((it) => (
                <li key={it.id} className="flex items-center gap-x-2 mb-3">
                  <input
                    type="checkbox"
                    name="category"
                    id={`category-${it.id}`}
                    checked={categoryIds.includes(it.id)}
                  />

                  <label
                    htmlFor={`category-${it.id}`}
                    className="cursor-pointer select-none"
                    onClick={() => onCategoryClick(it.id)}
                  >
                    {it.name}
                  </label>
                </li>
              ))}
            </ul>

            <div className="h-[260px] relative mt-8">
              <img
                src="/images/sidebar.jpeg"
                alt="Image"
                className="block w-full h-full object-cover"
              />

              <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#0A0A0A66] pt-8 pb-6 pl-6 flex flex-col justify-between">
                <p className="text-lg font-bold text-white tracking-wide">
                  Grow your own favourite plant
                </p>

                <div className="flex items-center text-white gap-x-2">
                  <p>Shop Now</p>

                  <div className="rounded-full size-5 border-white border-2 flex items-center justify-center text-xs">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchProductsPage;
