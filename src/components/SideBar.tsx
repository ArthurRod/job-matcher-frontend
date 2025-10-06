import {useAuth} from "@/contexts/AuthContext";
import Link from "next/link";

export function Sidebar() {
  const {user, logout} = useAuth();

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-lg font-bold border-b border-gray-700">
        Job Matcher
      </div>
      <div className="p-6 flex flex-col space-y-2">
        <p className="text-sm mb-4">
          {user ? `Admin: ${user.email}` : "Não logado"}
        </p>
        <Link href="/jobs">
          <a className="px-3 py-2 rounded hover:bg-gray-700">Vagas</a>
        </Link>
        <Link href="/match">
          <a className="px-3 py-2 rounded hover:bg-gray-700">Match</a>
        </Link>
        {user && (
          <button
            onClick={logout}
            className="mt-4 px-3 py-2 bg-red-600 rounded hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>
    </aside>
  );
}
