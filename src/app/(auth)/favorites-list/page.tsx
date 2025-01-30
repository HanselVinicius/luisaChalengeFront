"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FavoriteListDto } from "@/lib/dto/FavoriteListDto";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FavoriteList from "./components/favoriteList";
import { FavoriteListForm } from "../home/components/favorite-list-form/favoriteListForm";
import { deleteFavoriteList } from "./actions/deleteFavoriteList";

export default function FavoritesPage(){
  const [favoriteList, setFavoriteList] = useState<FavoriteListDto | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/v1/favorite-list");

        if (!response.ok) return;
        const result = await response.json();
        setFavoriteList(result.favoriteList);
      } catch (error) {
      }
    };
    fetchFavorites();
  }, []);

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleUpdateFavoriteList = (updatedName: string, updatedDescription: string) => {
    if (favoriteList) {
      setFavoriteList({
        ...favoriteList,
        name: updatedName,
        description: updatedDescription,
      });
    }
    setIsEditOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!favoriteList) return;

    try {
      await deleteFavoriteList();
      toast.success("Lista de favoritos deletada com sucesso!");
      setFavoriteList(null);
      setIsDeleteOpen(false);

      router.push("/home");
    } catch (error) {
      toast.error("Erro ao deletar a lista. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {favoriteList ? (
        <>
          <FavoriteList
            name={favoriteList.name}
            description={favoriteList.description}
            products={favoriteList.products}
            onEdit={handleEdit}
            onDelete={() => setIsDeleteOpen(true)}
            onBack={() => router.back()}
          />

          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogTrigger asChild>
              <Button className="hidden">Abrir Edição</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-auto space-y-2">
              <DialogTitle className="text-lg">Editar Lista de Favoritos</DialogTitle>
              <FavoriteListForm
                initialName={favoriteList.name}
                initialDescription={favoriteList.description}
                onUpdate={handleUpdateFavoriteList}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogTrigger asChild>
              <Button className="hidden">Abrir Exclusão</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-auto space-y-4 text-center">
              <DialogTitle className="text-lg font-semibold">Deseja realmente excluir esta lista?</DialogTitle>
              <p className="text-gray-600">Essa ação não pode ser desfeita.</p>
              <div className="flex justify-center gap-4">
                <Button onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600">
                  Sim, excluir
                </Button>
                <Button onClick={() => setIsDeleteOpen(false)} variant="outline">
                  Cancelar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <p className="text-gray-500">Nenhuma lista de favoritos encontrada.</p>
      )}
    </div>
  );
};
