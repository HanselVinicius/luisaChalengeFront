import { Client } from "./Client";
import { Product } from "./Product";

export interface FavoriteList {
    id?: number;
    name: string;
    description: string;
    products: Set<Product>;
    client?: Client | null;
    enabled: boolean;
  }