"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_PRODUCTS_API_URL as string;
        console.log("API URL:", apiUrl);
        const response = await fetch(`${apiUrl}products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lista de Produtos</h1>
        <button
          onClick={() => router.push("/favoritos")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Lista de Favoritos
        </button>
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
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-3">{product.title}</h2>
              <p className="text-gray-600 text-sm">{product.category}</p>
              <p className="text-gray-800 font-bold">R$ {product.price}</p>
              <p className="text-gray-500 text-sm mt-2">{product.description}</p>

              {/* Botão de Favorito */}
              <button
                onClick={() => toggleFavorite(product.id)}
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
