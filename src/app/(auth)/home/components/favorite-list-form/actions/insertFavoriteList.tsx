export async function insertFavoriteList(name: string, description: string) {
  const response = await fetch("api/v1/favorite-list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description }),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar a lista de favoritos.");
  }
}
