import { Product } from "@/app/domain/Product";

export default async function deleteProduct(product: Product) {
  const productDto = {
    id: product.id,
    title: product.title,
    price: product.price,
    category: "",
    description: product.description,
    image: product.image,
  };
  const response = await fetch("/api/v1/product", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productDto),
  });

  return response.ok;
}
