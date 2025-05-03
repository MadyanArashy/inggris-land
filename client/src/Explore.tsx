import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

type User = {
  name: string
  email: string
  password: string
}

const Explore = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  return (
    <table className="w-full mx-auto table-fixed">
      <thead>
        <tr>
          <th className="text-center border border-amber-950">Name</th>
          <th className="text-center border border-amber-950">Email</th>
          <th className="text-center border border-amber-950">Password</th>
          <th className="text-center border border-amber-950">Streak</th>
          <th className="text-center border border-amber-950">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td className="border border-amber-950 text-center">{user.name}</td>
            <td className="border border-amber-950 text-center">{user.email}</td>
            <td className="border border-amber-950 text-center">{user.password}</td>
            <td className="border border-amber-950 text-center">0 🔥</td>
            <td className="border border-amber-950 text-center">
              <button className="bg-red-500 text-white px-2 py-1 rounded hover:opacity-75 cursor-pointer">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Explore;