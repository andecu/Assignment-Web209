import { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IProduct, ProductFormData } from "../interfaces/product";
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  updateProduct,
} from "../services/product";

interface IProductCT {
  products: IProduct[];
  onAddProduct: (data: ProductFormData) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateProduct: (id: string, data: ProductFormData) => void;
}

export const ProductCT = createContext({} as IProductCT);

const ProductContext = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAllProducts({
        _expand: "category",
      });
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onAddProduct = async (data: ProductFormData) => {
    try {
      await addProduct(data);
      fetchData();
      alert("Thêm SP thành công");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteProduct = async (id: string) => {
    try {
      const isConfirm = confirm("Xác nhận xoá SP?");

      if (isConfirm) {
        await deleteProductById(id);
        alert("Xoá SP thành công");

        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateProduct = async (id: string, data: ProductFormData) => {
    try {
      await updateProduct(id, data);
      alert("Cập nhật SP thành công");
      fetchData();

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductCT.Provider
      value={{ products, onAddProduct, onDeleteProduct, onUpdateProduct }}
    >
      <Outlet />
    </ProductCT.Provider>
  );
};

export default ProductContext;
