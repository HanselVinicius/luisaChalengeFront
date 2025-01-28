"use client";
import { useState } from "react";
import { Heart } from "lucide-react";
interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Smartphone",
    price: "R$ 2.500",
    category: "Eletrônicos",
    description: "Smartphone de última geração.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Notebook Gamer",
    price: "R$ 5.999",
    category: "Computadores",
    description: "Notebook potente para jogos e trabalho.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Fone de Ouvido Bluetooth",
    price: "R$ 199",
    category: "Acessórios",
    description: "Som de alta qualidade e conexão rápida.",
    image: "https://via.placeholder.com/150",
  },
];

export default function Home() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Lista de Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
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
            <p className="text-gray-800 font-bold">{product.price}</p>
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
    </div>
  );
}
