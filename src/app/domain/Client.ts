import { FavoriteList } from "./FavoriteList";

export interface Client {
    id: number;
    name: string;
    favoriteList?: FavoriteList | null;
    enabled: boolean;
  }