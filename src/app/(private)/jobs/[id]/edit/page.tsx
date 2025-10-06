"use client";

import {useState, useEffect} from "react";
import {useRouter, useParams} from "next/navigation";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salaryRange: string;
  skills: string[];
}

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [skills, setSkills] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchJob = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/jobs/${jobId}`);

      if (!res.ok) throw new Error("Erro ao buscar vaga");

      const data = await res.json();
      setJob(data);
      setTitle(data.title);
      setDescription(data.description);
      setLocation(data.location);
      setSalaryRange(data.salaryRange);
      setSkills(data.skills.join(", "));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Erro ao buscar vaga");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          title,
          description,
          location,
          salaryRange,
          skills: skills.split(",").map((s) => s.trim()),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao atualizar vaga");
      }

      router.push("/jobs");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar vaga");
    }
  };

  if (loading) return <p>Carregando vaga...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md p-8 rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">Editar Vaga</h1>

      {error && (
        <p className="bg-red-100 text-red-600 px-3 py-2 rounded mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Título da vaga"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={5}
          required
        />
        <input
          type="text"
          placeholder="Localização"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Faixa salarial"
          value={salaryRange}
          onChange={(e) => setSalaryRange(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Skills (separadas por vírgula)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Atualizar Vaga
        </button>
      </form>
    </div>
  );
}
