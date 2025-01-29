export async function updateFavoriteList(name: string, description: string) {
  const response = await fetch("api/v1/favorite-list", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description }),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar a lista de favoritos.");
  }
}