"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPessoas, getTotais, Pessoa, Totais } from "@/lib/api";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";

interface PessoaTotais extends Pessoa {
  totais?: Totais;
  loading: boolean;
  error?: string;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function SaldoBadge({ saldo }: { saldo: number }) {
  const positive = saldo >= 0;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        positive
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {positive ? "▲" : "▼"} {formatCurrency(Math.abs(saldo))}
    </span>
  );
}

export default function DashboardPage() {
  const [pessoas, setPessoas] = useState<PessoaTotais[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPessoas()
      .then((data) => {
        const initial: PessoaTotais[] = data.map((p) => ({
          ...p,
          loading: true,
        }));
        setPessoas(initial);
        setLoading(false);

        // Fetch totals for each person
        data.forEach((p) => {
          getTotais(p.id)
            .then((totais) => {
              setPessoas((prev) =>
                prev.map((pp) =>
                  pp.id === p.id ? { ...pp, totais, loading: false } : pp
                )
              );
            })
            .catch((err: Error) => {
              setPessoas((prev) =>
                prev.map((pp) =>
                  pp.id === p.id
                    ? { ...pp, loading: false, error: err.message }
                    : pp
                )
              );
            });
        });
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 text-lg animate-pulse">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-6 text-center">
        <p className="text-red-700 font-medium">Erro ao conectar com a API</p>
        <p className="text-red-500 text-sm mt-1">{error}</p>
        <p className="text-gray-500 text-sm mt-3">
          Certifique-se de que o backend está rodando em{" "}
          <code className="bg-gray-100 px-1 rounded">
            {process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}
          </code>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Resumo financeiro por pessoa da residência
        </p>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            href: "/pessoas",
            icon: "👤",
            label: "Gerenciar Pessoas",
            color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
          },
          {
            href: "/categorias",
            icon: "🏷️",
            label: "Gerenciar Categorias",
            color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
          },
          {
            href: "/transacoes",
            icon: "💸",
            label: "Gerenciar Transações",
            color: "bg-green-50 border-green-200 hover:bg-green-100",
          },
        ].map(({ href, icon, label, color }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${color}`}
          >
            <span className="text-2xl">{icon}</span>
            <span className="font-medium text-gray-700">{label}</span>
          </Link>
        ))}
      </div>

      {/* People cards */}
      {pessoas.length === 0 ? (
        <Card>
          <CardBody className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhuma pessoa cadastrada.</p>
            <Link
              href="/pessoas"
              className="mt-4 inline-block text-indigo-600 hover:underline font-medium"
            >
              Cadastrar primeira pessoa →
            </Link>
          </CardBody>
        </Card>
      ) : (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Resumo por Pessoa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pessoas.map((p) => (
              <Card key={p.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{p.nome}</h3>
                      <p className="text-sm text-gray-500">{p.idade} anos</p>
                    </div>
                    <span className="text-3xl">
                      {p.idade < 18 ? "🧒" : "👤"}
                    </span>
                  </div>
                </CardHeader>
                <CardBody>
                  {p.loading ? (
                    <div className="animate-pulse space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </div>
                  ) : p.error ? (
                    <p className="text-red-500 text-sm">{p.error}</p>
                  ) : p.totais ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Receitas</span>
                        <span className="text-sm font-semibold text-green-600">
                          {formatCurrency(p.totais.totalReceitas)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Despesas</span>
                        <span className="text-sm font-semibold text-red-600">
                          {formatCurrency(p.totais.totalDespesas)}
                        </span>
                      </div>
                      <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          Saldo
                        </span>
                        <SaldoBadge saldo={p.totais.saldo} />
                      </div>
                    </div>
                  ) : null}
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
