const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Categoria {
  id: number;
  descricao: string;
  finalidade: string; // "Despesa" | "Receita" | "Ambas"
}

export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export interface Transacao {
  id: number;
  descricao: string;
  valor: string;
  data: string;
  tipo: string; // "Despesa" | "Receita"
  pessoaId: number;
  pessoa?: Pessoa;
  categoriaId: number;
  categoria?: Categoria;
}

export interface Totais {
  nomePessoa: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  // 204 No Content
  if (res.status === 204) return undefined as T;
  return res.json();
}

// ─── Categorias ───────────────────────────────────────────────────────────────

export const getCategorias = () => request<Categoria[]>("/api/Categoria");

export const postCategoria = (data: Omit<Categoria, "id">) =>
  request<Categoria>("/api/Categoria", {
    method: "POST",
    body: JSON.stringify(data),
  });

// ─── Pessoas ──────────────────────────────────────────────────────────────────

export const getPessoas = () => request<Pessoa[]>("/api/Pessoa");

export const postPessoa = (data: Omit<Pessoa, "id">) =>
  request<Pessoa>("/api/Pessoa", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const deletePessoa = (id: number) =>
  request<void>(`/api/Pessoa/${id}`, { method: "DELETE" });

export const getTotais = (id: number) =>
  request<Totais>(`/api/Pessoa/${id}/totais`);

// ─── Transações ───────────────────────────────────────────────────────────────

export const getTransacoes = () => request<Transacao[]>("/api/Transacao");

export const postTransacao = (
  data: Omit<Transacao, "id" | "pessoa" | "categoria">
) =>
  request<Transacao>("/api/Transacao", {
    method: "POST",
    body: JSON.stringify(data),
  });
