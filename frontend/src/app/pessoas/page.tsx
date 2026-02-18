"use client";

import { useEffect, useState } from "react";
import { getPessoas, postPessoa, deletePessoa, Pessoa } from "@/lib/api";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function PessoasPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete state
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchPessoas = () => {
    setLoading(true);
    getPessoas()
      .then((data) => {
        setPessoas(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPessoas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!nome.trim()) {
      setFormError("Nome é obrigatório.");
      return;
    }
    const idadeNum = parseInt(idade, 10);
    if (isNaN(idadeNum) || idadeNum < 0) {
      setFormError("Idade inválida.");
      return;
    }

    setSubmitting(true);
    try {
      await postPessoa({ nome: nome.trim(), idade: idadeNum });
      setNome("");
      setIdade("");
      fetchPessoas();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Erro ao cadastrar.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja remover esta pessoa?")) return;
    setDeletingId(id);
    try {
      await deletePessoa(id);
      setPessoas((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Erro ao remover.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pessoas</h1>
        <p className="text-gray-500 mt-1">
          Gerencie os moradores da residência
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <h2 className="font-semibold text-gray-800">Nova Pessoa</h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="nome"
                label="Nome"
                placeholder="Ex: João Silva"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <Input
                id="idade"
                label="Idade"
                type="number"
                min={0}
                max={120}
                placeholder="Ex: 30"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                required
              />
              {formError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {formError}
                </p>
              )}
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Cadastrando..." : "Cadastrar Pessoa"}
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-800">
                Pessoas Cadastradas{" "}
                <span className="text-gray-400 font-normal text-sm">
                  ({pessoas.length})
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
              ) : pessoas.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  Nenhuma pessoa cadastrada ainda.
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {pessoas.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {p.idade < 18 ? "🧒" : "👤"}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">{p.nome}</p>
                          <p className="text-sm text-gray-500">
                            {p.idade} anos
                            {p.idade < 18 && (
                              <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full">
                                Menor de idade
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(p.id)}
                        disabled={deletingId === p.id}
                      >
                        {deletingId === p.id ? "..." : "Remover"}
                      </Button>
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
