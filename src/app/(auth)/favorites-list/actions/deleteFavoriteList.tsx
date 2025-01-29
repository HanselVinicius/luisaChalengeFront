export async function deleteFavoriteList() {
  try {
    const response = await fetch(`api/v1/favorite-list`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar a lista de favoritos");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
