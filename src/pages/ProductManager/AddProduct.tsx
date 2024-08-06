import { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ProductFormData } from "../../interfaces/product";
import { ProductCT } from "../../context/ProductContext";
import { CategoryCT } from "../../context/CategoryContext";

const AddProduct = () => {
  const { onAddProduct } = useContext(ProductCT);
  const { categories } = useContext(CategoryCT);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductFormData>();

  const onSubmit = (values: ProductFormData) => {
    onAddProduct(values);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-medium text-lg">Thêm SP</h1>

        <Link
          to="/admin/products"
          className="bg-black px-3 py-2 rounded text-white"
        >
          DS sản phẩm
        </Link>
      </div>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="" className="block">
            Tên SP
            <span className="text-red-500 ml-1">*</span>
          </label>

          <input
            type="text"
            {...register("name", {
              required: "Vui lòng nhập tên SP",
              minLength: {
                value: 6,
                message: "Tên SP tối thiểu 6 ký tự",
              },
            })}
            placeholder="Nhập tên SP"
            className="px-2 rounded py-2 border border-black w-full mt-1 outline-none"
          />

          {errors?.name && (
            <p className="mt-1 text-sm text-red-500">{errors?.name?.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="" className="block">
            Giá SP
            <span className="text-red-500 ml-1">*</span>
          </label>

          <input
            type="text"
            {...register("price", {
              required: "Vui lòng nhập giá SP",
              pattern: {
                value: /^\d*$/,
                message: "Giá SP không đúng định dạng",
              },
            })}
            placeholder="Nhập giá SP"
            className="px-2 rounded py-2 border border-black w-full mt-1 outline-none"
          />

          {errors?.price && (
            <p className="mt-1 text-sm text-red-500">
              {errors?.price?.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="" className="block">
            Ảnh SP
            <span className="text-red-500 ml-1">*</span>
          </label>

          <input
            type="text"
            {...register("image", {
              required: "Vui lòng nhập link ảnh",
            })}
            placeholder="Nhập link ảnh"
            className="px-2 rounded py-2 border border-black w-full mt-1 outline-none"
          />

          {errors?.image && (
            <p className="mt-1 text-sm text-red-500">
              {errors?.image?.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="" className="block">
            Danh mục SP
            <span className="text-red-500 ml-1">*</span>
          </label>

          <select
            {...register("categoryId", {
              required: "Vui lòng chọn danh mục SP",
            })}
            className="px-2 rounded py-2 border border-black w-full mt-1 outline-none"
          >
            <option value="">Chọn danh mục SP</option>

            {categories.map((it) => (
              <option key={it.id} value={it.id}>
                {it.name}
              </option>
            ))}
          </select>

          {errors?.categoryId && (
            <p className="mt-1 text-sm text-red-500">
              {errors?.categoryId?.message}
            </p>
          )}
        </div>

        <button className="bg-black px-3 py-2 rounded text-white">
          Thêm SP
        </button>
      </form>
    </>
  );
};

export default AddProduct;
