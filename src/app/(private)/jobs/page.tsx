"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salaryRange: string;
  skills: string[];
  createdAt: string;
}

interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);

  const router = useRouter();

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  async function fetchJobs(page: number) {
    try {
      const res = await fetch(`/api/jobs?page=${page}&limit=${limit}`);
      const data: JobsResponse = await res.json();

      setJobs(data.jobs);
      setTotal(data.total);
      setLimit(data.limit);
      setPage(data.page);
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Deseja realmente deletar esta vaga?")) return;

    try {
      await fetch(`/api/jobs/${id}`, {method: "DELETE"});
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Erro ao deletar vaga:", error);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Vagas</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          onClick={() => router.push("/jobs/new")}
        >
          Criar Vaga
        </button>
      </div>

      {!jobs || jobs.length === 0 ? (
        <div className="grid grid-cols-1 gap-6">Sem vagas cadastradas</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border border-zinc-400 p-4 rounded-2xl card"
            >
              <h3 className="text-xl font-bold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-2">
                {job.description.length > 200
                  ? job.description.slice(0, 200) + "..."
                  : job.description}
              </p>
              <p className="text-gray-500 mb-1">
                <strong>Local:</strong> {job.location}
              </p>
              <p className="text-gray-500 mb-1">
                <strong>Faixa salarial:</strong> {job.salaryRange}
              </p>
              <p className="text-gray-500 mb-2">
                <strong>Skills:</strong> {job.skills.join(", ")}
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Criada em: {new Date(job.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-2">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  onClick={() => router.push(`/jobs/${job._id}/edit`)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  onClick={() => handleDelete(job._id)}
                >
                  Deletar
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  onClick={() => router.push(`/jobs/${job._id}/match`)}
                >
                  Ver Match
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages >= 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
            Página {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  );
}
