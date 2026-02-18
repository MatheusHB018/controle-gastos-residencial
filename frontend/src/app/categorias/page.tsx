"use client";

import { useEffect, useState } from "react";
import { getCategorias, postCategoria, Categoria } from "@/lib/api";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";

const finalidadeOptions = ["Despesa", "Receita", "Ambas"];

const finalidadeBadge: Record<string, string> = {
  Despesa: "bg-red-100 text-red-700",
  Receita: "bg-green-100 text-green-700",
  Ambas: "bg-blue-100 text-blue-700",
};

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState("Ambas");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchCategorias = () => {
    setLoading(true);
    getCategorias()
      .then((data) => {
        setCategorias(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!descricao.trim()) {
      setFormError("Descrição é obrigatória.");
      return;
    }

    setSubmitting(true);
    try {
      await postCategoria({ descricao: descricao.trim(), finalidade });
      setDescricao("");
      setFinalidade("Ambas");
      fetchCategorias();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Erro ao cadastrar.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>
        <p className="text-gray-500 mt-1">
          Organize suas transações por categoria
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <h2 className="font-semibold text-gray-800">Nova Categoria</h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="descricao"
                label="Descrição"
                placeholder="Ex: Alimentação"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
              <Select
                id="finalidade"
                label="Finalidade"
                value={finalidade}
                onChange={(e) => setFinalidade(e.target.value)}
              >
                {finalidadeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Select>
              {formError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {formError}
                </p>
              )}
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Cadastrando..." : "Cadastrar Categoria"}
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-800">
                Categorias Cadastradas{" "}
                <span className="text-gray-400 font-normal text-sm">
                  ({categorias.length})
                </span>
              </h2>
            </CardHeader>
            <CardBody className="p-0">
              {loading ? (
                <div className="p-6 text-center text-gray-500 animate-pulse">
                  Carregando...
                </div>
              ) : error ? (
                <div className="p-6 text-center text-red-500">{error}</div>
              ) : categorias.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  Nenhuma categoria cadastrada ainda.
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {categorias.map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🏷️</span>
                        <div>
                          <p className="font-medium text-gray-900">
                            {c.descricao}
                          </p>
                          <p className="text-sm text-gray-500">
                            ID #{c.id}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          finalidadeBadge[c.finalidade] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {c.finalidade}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
