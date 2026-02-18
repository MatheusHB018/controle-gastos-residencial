"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/pessoas", label: "Pessoas" },
  { href: "/categorias", label: "Categorias" },
  { href: "/transacoes", label: "Transações" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-indigo-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <span className="text-white font-bold text-lg tracking-tight">
              Controle de Gastos
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            {links.map(({ href, label }) => {
              const active =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-white/20 text-white"
                      : "text-indigo-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
