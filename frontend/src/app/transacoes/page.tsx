"use client";

import { useEffect, useState } from "react";
import {
  getTransacoes,
  postTransacao,
  getPessoas,
  getCategorias,
  Transacao,
  Pessoa,
  Categoria,
} from "@/lib/api";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";

function formatCurrency(value: string | number) {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(isNaN(num) ? 0 : num);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

export default function TransacoesPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);
  const [tipo, setTipo] = useState("Despesa");
  const [pessoaId, setPessoaId] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Filter state
  const [filterTipo, setFilterTipo] = useState("Todos");
  const [filterPessoa, setFilterPessoa] = useState("Todos");

  const fetchAll = () => {
    setLoading(true);
    Promise.all([getTransacoes(), getPessoas(), getCategorias()])
      .then(([t, p, c]) => {
        setTransacoes(t);
        setPessoas(p);
        setCategorias(c);
        if (p.length > 0 && !pessoaId) setPessoaId(String(p[0].id));
        if (c.length > 0 && !categoriaId) setCategoriaId(String(c[0].id));
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!descricao.trim()) {
      setFormError("Descrição é obrigatória.");
      return;
    }
    const valorNum = parseFloat(valor.replace(",", "."));
    if (isNaN(valorNum) || valorNum <= 0) {
      setFormError("Valor inválido.");
      return;
    }
    if (!pessoaId) {
      setFormError("Selecione uma pessoa.");
      return;
    }
    if (!categoriaId) {
      setFormError("Selecione uma categoria.");
      return;
    }

    setSubmitting(true);
    try {
      await postTransacao({
        descricao: descricao.trim(),
        valor: String(valorNum),
        data: new Date(data).toISOString(),
        tipo,
        pessoaId: parseInt(pessoaId, 10),
        categoriaId: parseInt(categoriaId, 10),
      });
      setDescricao("");
      setValor("");
      setData(new Date().toISOString().split("T")[0]);
      setTipo("Despesa");
      fetchAll();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Erro ao cadastrar.");
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered list
  const filtered = transacoes.filter((t) => {
    const matchTipo = filterTipo === "Todos" || t.tipo === filterTipo;
    const matchPessoa =
      filterPessoa === "Todos" || String(t.pessoaId) === filterPessoa;
    return matchTipo && matchPessoa;
  });

  // Totals for filtered
  const totalReceitas = filtered
    .filter((t) => t.tipo.toLowerCase() === "receita")
    .reduce((acc, t) => acc + parseFloat(t.valor), 0);
  const totalDespesas = filtered
    .filter((t) => t.tipo.toLowerCase() === "despesa")
    .reduce((acc, t) => acc + parseFloat(t.valor), 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Transações</h1>
        <p className="text-gray-500 mt-1">
          Registre receitas e despesas da residência
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <h2 className="font-semibold text-gray-800">Nova Transação</h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="descricao"
                label="Descrição"
                placeholder="Ex: Conta de luz"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
              <Input
                id="valor"
                label="Valor (R$)"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Ex: 150.00"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
              />
              <Input
                id="data"
                label="Data"
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
              <Select
                id="tipo"
                label="Tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="Despesa">Despesa</option>
                <option value="Receita">Receita</option>
              </Select>
              <Select
                id="pessoaId"
                label="Pessoa"
                value={pessoaId}
                onChange={(e) => setPessoaId(e.target.value)}
                required
              >
                {pessoas.length === 0 ? (
                  <option value="">Nenhuma pessoa cadastrada</option>
                ) : (
                  pessoas.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome} ({p.idade} anos)
                    </option>
                  ))
                )}
              </Select>
              <Select
                id="categoriaId"
                label="Categoria"
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
                required
              >
                {categorias.length === 0 ? (
                  <option value="">Nenhuma categoria cadastrada</option>
                ) : (
                  categorias.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.descricao} ({c.finalidade})
                    </option>
                  ))
                )}
              </Select>
              {formError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {formError}
                </p>
              )}
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Registrando..." : "Registrar Transação"}
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm text-green-600 font-medium">
                Total Receitas
              </p>
              <p className="text-xl font-bold text-green-700 mt-1">
                {formatCurrency(totalReceitas)}
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-sm text-red-600 font-medium">Total Despesas</p>
              <p className="text-xl font-bold text-red-700 mt-1">
                {formatCurrency(totalDespesas)}
              </p>
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardBody className="py-3">
              <div className="flex flex-wrap gap-3 items-center">
                <span className="text-sm font-medium text-gray-600">
                  Filtrar:
                </span>
                <Select
                  id="filterTipo"
                  value={filterTipo}
                  onChange={(e) => setFilterTipo(e.target.value)}
                  className="w-auto"
                >
                  <option value="Todos">Todos os tipos</option>
                  <option value="Receita">Receita</option>
                  <option value="Despesa">Despesa</option>
                </Select>
                <Select
                  id="filterPessoa"
                  value={filterPessoa}
                  onChange={(e) => setFilterPessoa(e.target.value)}
                  className="w-auto"
                >
                  <option value="Todos">Todas as pessoas</option>
                  {pessoas.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome}
                    </option>
                  ))}
                </Select>
              </div>
            </CardBody>
          </Card>

          {/* Table */}
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-800">
                Transações{" "}
                <span className="text-gray-400 font-normal text-sm">
                  ({filtered.length})
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
              ) : filtered.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  Nenhuma transação encontrada.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Descrição
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Pessoa
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Categoria
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Data
                        </th>
                        <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Valor
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filtered.map((t) => (
                        <tr
                          key={t.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span>
                                {t.tipo.toLowerCase() === "receita"
                                  ? "💰"
                                  : "💸"}
                              </span>
                              <span className="font-medium text-gray-900">
                                {t.descricao}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-gray-600">
                            {t.pessoa?.nome ?? `#${t.pessoaId}`}
                          </td>
                          <td className="px-4 py-4 text-gray-600">
                            {t.categoria?.descricao ?? `#${t.categoriaId}`}
                          </td>
                          <td className="px-4 py-4 text-gray-500">
                            {formatDate(t.data)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span
                              className={`font-semibold ${
                                t.tipo.toLowerCase() === "receita"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {t.tipo.toLowerCase() === "receita" ? "+" : "-"}
                              {formatCurrency(t.valor)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
