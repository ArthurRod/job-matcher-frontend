"use client";

import {useEffect, useState} from "react";
import {useParams} from "next/navigation";

interface Candidate {
  id: string;
  name: string;
  email: string;
  skills: string[];
  experienceYears: number;
  score: number;
  invited: boolean;
  invitedReason: string;
}

export default function MatchPage() {
  const params = useParams();
  const jobId = params.id;

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await fetch(`/api/jobs/${jobId}/match`);
      if (!res.ok) throw new Error("Erro ao buscar candidatos");
      const data = await res.json();
      setCandidates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (candidateId: string) => {
    try {
      const res = await fetch(`/api/candidates/${candidateId}/invite`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Erro ao convidar candidato");

      setCandidates(
        candidates.map((c) =>
          c.id === candidateId
            ? {...c, invited: true, invitedReason: "Convite enviado"}
            : c
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Carregando candidatos...</p>;
  if (!candidates || candidates.length === 0)
    return <p>Sem candidatos compatíveis</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Candidatos Compatíveis</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="border border-zinc-400 p-4 rounded-2xl card"
          >
            <h3 className="text-xl font-bold mb-2">{candidate.name}</h3>
            <p className="text-gray-500 mb-1">
              <strong>Email:</strong> {candidate.email}
            </p>
            <p className="text-gray-500 mb-1">
              <strong>Skills:</strong> {candidate.skills.join(", ")}
            </p>
            <p className="text-gray-500 mb-1">
              <strong>Experiência:</strong> {candidate.experienceYears} anos
            </p>
            <p className="text-gray-500 mb-2">
              <strong>Score:</strong> {candidate.score}
            </p>

            <button
              onClick={() => handleInvite(candidate.id)}
              disabled={candidate.invited}
              className={`w-full px-4 py-2 rounded text-white ${
                candidate.invited
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } transition`}
            >
              {candidate.invited
                ? candidate.invitedReason || "Convidado"
                : "Convidar"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
