import { useEffect, useState } from "react";
import axios from "axios";

export interface User {
  id?: number;
  username?: string;
  email?: string;
}

export interface Completion {
  groupId: number;
  score: number;
  total: number;
  createdAt: string;
  groupName?: string; // Add groupName to Completion interface
}

export interface HistoryProps {
  user: User | null;
}

const History = ({ user }: HistoryProps) => {
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      // Handle case where user is not logged in
      setError("You must be logged in to view your history.");
      setLoading(false);
      return;
    }

    const fetchCompletions = async () => {
      try {
        // Fetch completions for the logged-in user using user.id
        const res = await axios.get(`http://localhost:5000/api/completions/${user.id}`);
        const completionData = res.data;

        // Fetch group name for each completion
        const completionsWithGroupName = await Promise.all(completionData.map(async (completion: Completion) => {
          const groupRes = await axios.get(`http://localhost:5000/api/groups/${completion.groupId}`);
          const groupName = groupRes.data.name; // Assuming the group has a 'name' property
          return { ...completion, groupName };
        }));

        setCompletions(completionsWithGroupName);
      } catch (error) {
        console.error("Failed to fetch completions", error);
        setError("Failed to load completions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompletions();
  }, [user]); // Re-run this effect if `user` changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Your Completion History</h1>
      <ul className="space-y-4">
        {completions.map((completion) => (
          <li key={completion.groupId} className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-xl font-semibold">{completion.groupName}</div>
            <div className="text-gray-600">
              Score: {completion.score}/{completion.total}
            </div>
            <div className="text-gray-400">Completed on: {new Date(completion.createdAt).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
