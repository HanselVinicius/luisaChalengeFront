"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FavoriteListForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ name: false, description: false });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const validateForm = () => {
    const newErrors = {
      name: name.trim() === "",
      description: description.trim() === "",
    };
    setErrors(newErrors);
    return !newErrors.name && !newErrors.description;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);

    if (!validateForm()) {
      setMessage({ type: "error", text: "Preencha todos os campos corretamente." });
      return;
    }

    setLoading(true);

    try {
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

      setMessage({ type: "success", text: "Lista de favoritos criada com sucesso!" });
      setName("");
      setDescription("");
      setErrors({ name: false, description: false });

      setTimeout(() => {
        router.push("/favorite-list");
      }, 2000);
    } catch (error) {
      setMessage({ type: "error", text: "Falha ao criar a lista. Tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[400px] pt-6 mx-auto mt-10">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Digite o nome da lista"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "border-red-500" : ""}
              required
            />
            {errors.name && <p className="text-red-500 text-sm">O nome é obrigatório.</p>}
          </div>
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Digite uma descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={errors.description ? "border-red-500" : ""}
              required
            />
            {errors.description && <p className="text-red-500 text-sm">A descrição é obrigatória.</p>}
          </div>
        </form>
      </CardContent>

      {message && (
        <div className={`text-center mt-2 text-sm ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
          {message.text}
        </div>
      )}

      <CardFooter className="flex justify-end">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Criando..." : "Criar Lista"}
        </Button>
      </CardFooter>
    </Card>
  );
}
