import { Category } from "@/types/Category";
import Api from "./Api";

export class CategoryApi {
  static async getAll() {
    const { data: categories } = await Api.get<Category[]>("/categories");
    return categories;
  }

  static async getOne(id: number) {
    const { data: category } = await Api.get<Category>(`/categories/${id}`);
    return category;
  }
}
