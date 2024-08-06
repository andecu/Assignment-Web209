import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/category";
import { ICategory } from "../../interfaces/category";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAllCategories({
        _embed: "products",
      });

      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="border-b border-[#0000001A] mt-12">
        <h1 className="max-w-[1200px] mx-auto baloo-font text-3xl text-[#505F4E] font-bold px-3">
          Danh mục
        </h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-3 mt-12">
        <div className="grid grid-cols-4 gap-6">
          {categories?.map((it) => (
            <div
              key={it.id}
              className="relative cursor-pointer"
              onClick={() => navigate(`/category/${it.id}`)}
            >
              <img
                src={`${it.image}`}
                alt={it.name}
                className="block w-full h-[368px] object-cover"
              />

              <div className="absolute top-6 right-8 z-10">
                <p className="font-semibold text-lg text-white">{it.name}</p>
                <p className="text-white">{it.products.length} sản phẩm</p>
              </div>

              <div className="absolute top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.2)] w-full h-full"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
