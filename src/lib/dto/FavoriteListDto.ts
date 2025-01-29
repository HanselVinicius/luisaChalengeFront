import { Product } from "@/app/domain/Product";

export interface FavoriteListDto {
  name: string;
  description: string;
  products: Product[];
}