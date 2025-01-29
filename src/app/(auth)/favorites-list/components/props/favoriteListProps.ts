import { Product } from "@/app/domain/Product";

export interface FavoriteListProps {
    name: string;
    description: string;
    products: Product[];
    onEdit: () => void;
    onDelete: () => void;
    onBack: () => void;
  }