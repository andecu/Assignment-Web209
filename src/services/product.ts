/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api/api";
import { ProductFormData } from "../interfaces/product";

export const getAllProducts = async (params?: any) => {
  try {
    const { data } = await api.get("/products", {
      params,
    });
    return data;
  } catch (error) {
    throw new Error("lỗi");
  }
};

export const getProductById = async (id: string, params?: any) => {
  try {
    const { data } = await api.get(`/products/${id}`, {
      params,
    });
    return data;
  } catch (error) {
    throw new Error("lỗi");
  }
};

export const addProduct = async (formData: ProductFormData) => {
  try {
    const { data } = await api.post("/products", formData);
    return data;
  } catch (error) {
    throw new Error("lỗi");
  }
};

export const updateProduct = async (id: string, formData: ProductFormData) => {
  try {
    const { data } = await api.put(`/products/${id}`, formData);
    return data;
  } catch (error) {
    throw new Error("lỗi");
  }
};

export const deleteProductById = async (id: string) => {
  try {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  } catch (error) {
    throw new Error("lỗi");
  }
};
