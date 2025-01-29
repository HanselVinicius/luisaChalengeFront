import { FavoriteList } from "./FavoriteList";

export interface Product {
    id?: number;
    productId: number;
    title: string;
    price: string; 
    description: string;
    image: string;
    enabled: boolean;
    favoriteList?: FavoriteList | null;
  }