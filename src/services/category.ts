/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api/api";
import { CategoryFormData } from "../interfaces/category";

export const getAllCategories = async (params?: any) => {
  try {
    const { data } = await api.get("/categories", { params });
    return data;
  } catch (error) {
    throw new Error("lỗi");
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const { data } = await api.get(`/categories/${id}`);
    return data;
  } catch (error) {
    throw new Error("lỗi");
  }
};

export const addCategory = async (formData: CategoryFormData) => {
  try {
    const { data } = await api.post("/categories", formData);
    return data;
  } catch (error) {
    throw new Error("lỗi");
  }
};

export const updateCategory = async (
  id: string,
  formData: CategoryFormData
) => {
  try {
    const { data } = await api.put(`/categories/${id}`, formData);
    return data;
  } catch (error) {
    throw new Error("lỗi");
  }
};

export const deleteCategoryById = async (id: string) => {
  try {
    const { data } = await api.delete(`/categories/${id}`);
    return data;
  } catch (error) {
    throw new Error("lỗi");
  }
};
