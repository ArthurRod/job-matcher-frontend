"use client";

import {useRouter} from "next/navigation";
import {ReactNode} from "react";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({children}: PrivateLayoutProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {method: "POST"});
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Vagas cadastradas</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 p-6">{children}</main>

      {/* Footer opcional */}
      <footer className="bg-white shadow-inner p-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Vagas & Match
      </footer>
    </div>
  );
}
