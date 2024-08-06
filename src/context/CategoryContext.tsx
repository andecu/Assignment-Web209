import { createContext, useEffect, useState } from "react";
import { CategoryFormData, ICategory } from "../interfaces/category";
import {
  addCategory,
  deleteCategoryById,
  getAllCategories,
  updateCategory,
} from "../services/category";
import { Outlet, useNavigate } from "react-router-dom";

interface ICategoryCT {
  categories: ICategory[];
  onAddCategory: (data: CategoryFormData) => void;
  onDeleteCategory: (id: string) => void;
  onUpdateCategory: (id: string, data: CategoryFormData) => void;
}

export const CategoryCT = createContext({} as ICategoryCT);

interface ICategoryContextProps {
  children?: JSX.Element;
}

const CategoryContext = ({ children }: ICategoryContextProps) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onAddCategory = async (data: CategoryFormData) => {
    try {
      await addCategory(data);
      fetchData();
      alert("Thêm danh mục thành công");
      navigate("/admin/categories");
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteCategory = async (id: string) => {
    try {
      const isConfirm = confirm("Xác nhận xoá danh mục?");

      if (isConfirm) {
        await deleteCategoryById(id);
        alert("Xoá danh mục thành công");

        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateCategory = async (id: string, data: CategoryFormData) => {
    try {
      await updateCategory(id, data);
      alert("Cập nhật thành công");
      fetchData();

      navigate("/admin/categories");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoryCT.Provider
      value={{ categories, onAddCategory, onDeleteCategory, onUpdateCategory }}
    >
      <Outlet />
      {children}
    </CategoryCT.Provider>
  );
};

export default CategoryContext;
