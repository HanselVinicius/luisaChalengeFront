import { FC, useState } from "react";
import { Trash, Pencil, ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FavoriteListProps } from "./props/favoriteListProps";
import { toast } from "react-hot-toast";
import deleteProduct from "./actions/deleteProduct";
import { Product } from "@/app/domain/Product";

const FavoriteList: FC<FavoriteListProps> = ({
  name,
  description,
  products,
  onEdit,
  onDelete,
  onBack,
}) => {
  const [updatedProducts, setUpdatedProducts] = useState(products);

  const handleDeleteProduct = async (product: Product) => {
    const success = await deleteProduct(product);

    if (!success) {
      return toast.error("Erro ao remover produto.");
    }
    toast.success("Produto removido com sucesso!");

    setUpdatedProducts(
      updatedProducts.filter((productOnList) => productOnList.id !== product.id)
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-md">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onEdit}
              className="p-2 text-blue-500 hover:text-blue-700"
            >
              <Pencil size={24} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-500 hover:text-red-700"
            >
              <Trash size={24} />
            </button>
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={24} />
            </button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {updatedProducts.length > 0 ? (
            updatedProducts.map((product) => (
              <Card
                key={product.id}
                className="flex items-center gap-4 p-4 bg-gray-50 shadow-sm"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-gray-500">{product.description}</p>
                  <p className="text-green-600 font-bold">${product.price}</p>
                </div>
                <button
                  onClick={() => handleDeleteProduct(product)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash size={24} />
                </button>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">Nenhum produto encontrado.</p>
          )}
        </CardContent>

        <CardFooter className="text-gray-500 text-sm">
          Total de produtos: {updatedProducts.length}
        </CardFooter>
      </Card>
    </div>
  );
};

export default FavoriteList;
