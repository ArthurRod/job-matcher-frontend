import {ReactNode} from "react";
import {useAuth} from "../context/AuthContext";
import Link from "next/link";

export default function Layout({children}: {children: ReactNode}) {
  const {token, logout} = useAuth();

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-lg font-bold border-b border-gray-700">
          Job Matcher
        </div>
        <div className="p-6">
          <p className="mb-4 text-sm">
            Admin: {token ? "admin@teste.com" : ""}
          </p>
          <nav className="flex flex-col space-y-2">
            <Link href="/jobs">
              <a className="px-3 py-2 rounded hover:bg-gray-700">Vagas</a>
            </Link>
            <button
              onClick={logout}
              className="px-3 py-2 rounded hover:bg-gray-700 text-left"
            >
              Logout
            </button>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</main>
    </div>
  );
}
