/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CategoryCT } from "../../context/CategoryContext";
import { useForm } from "react-hook-form";
import { CategoryFormData } from "../../interfaces/category";
import { getCategoryById } from "../../services/category";

const EditCategory = () => {
  const { onUpdateCategory } = useContext(CategoryCT);

  const { id }: any = useParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CategoryFormData>();

  useEffect(() => {
    id && fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const data = await getCategoryById(id);
      reset(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (values: CategoryFormData) => {
    onUpdateCategory(id, values);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-medium text-lg">Cập nhật danh mục SP</h1>

        <Link
          to="/admin/categories"
          className="bg-black px-3 py-2 rounded text-white"
        >
          DS danh mục
        </Link>
      </div>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="" className="block">
            Tên danh mục
            <span className="text-red-500 ml-1">*</span>
          </label>

          <input
            type="text"
            {...register("name", {
              required: "Vui lòng nhập tên danh mục",
              minLength: {
                value: 6,
                message: "Tên danh mục tối thiểu 6 ký tự",
              },
            })}
            placeholder="Nhập tên danh mục"
            className="px-2 rounded py-2 border border-black w-full mt-1 outline-none"
          />

          {errors?.name && (
            <p className="mt-1 text-sm text-red-500">{errors?.name?.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="" className="block">
            Ảnh danh mục
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

        <button className="bg-black px-3 py-2 rounded text-white">
          Cập nhật danh mục
        </button>
      </form>
    </>
  );
};

export default EditCategory;
