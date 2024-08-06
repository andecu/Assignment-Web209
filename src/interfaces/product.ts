import { ICategory } from "./category";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryId: string;
  category: ICategory;
}

export type ProductFormData = Pick<
  IProduct,
  "name" | "price" | "image" | "categoryId"
>;
