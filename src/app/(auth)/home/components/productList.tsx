"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { favorite } from "../actions/favorite";
import { FavoriteList } from "@/app/domain/FavoriteList";
import { FavoriteListForm } from "./favorite-list-form/favoriteListForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Product } from "@/app/domain/Product";
import toast from "react-hot-toast";

export default function ProductList() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteList, setFavoriteList] = useState<FavoriteList | null>();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_PRODUCTS_API_URL as string;
        const response = await fetch(`${apiUrl}/products`);

        if (!response.ok) throw new Error("Erro na API de produtos");

        const data = await response.json();
        setProducts(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/v1/favorite-list");

        if (!response.ok) return;
        const result = await response.json();
        setFavoriteList(result);
        setFavorites(result.favoriteList.products.map((product:Product) => product.id));
      } catch (error) {
      }
    };

    fetchProducts();
    fetchFavorites();
  }, []);

  const toggleFavorite = async (product: ProductDto) => {
    const id = product.id;
    const isCurrentlyFavorite = favorites.includes(id);

    if(!favoriteList){
      toast.error("Você precisa criar uma lista de favoritos antes de favoritar produtos");
      return;
    }

    if(favorites.length === 5 && !isCurrentlyFavorite){
      toast.error("Você já possui 5 produtos favoritos");
      return;
    }
    await favorite(!isCurrentlyFavorite, product);

    setFavorites((prev) =>
      isCurrentlyFavorite ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lista de Produtos</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                if (favoriteList) {
                  router.push("/favorites-list");
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Lista de Favoritos
            </Button>
          </DialogTrigger>

          {!favoriteList && (
            <DialogContent className="max-w-md mx-auto space-y-2">
              <DialogTitle className="text-lg">
                Criar Lista de Favoritos
              </DialogTitle>
              <FavoriteListForm />
            </DialogContent>
          )}
        </Dialog>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Carregando produtos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden p-4 relative"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-100 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-3">{product.title}</h2>
              <p className="text-gray-600 text-sm">{product.category}</p>
              <p className="text-gray-800 font-bold">R$ {product.price}</p>
              <p className="text-gray-500 text-sm mt-2">
                {product.description}
              </p>

              <button
                onClick={() => toggleFavorite(product)}
                className="absolute top-4 right-4"
              >
                <Heart
                  size={24}
                  color={favorites.includes(product.id) ? "red" : "gray"}
                  fill={favorites.includes(product.id) ? "red" : "none"}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
