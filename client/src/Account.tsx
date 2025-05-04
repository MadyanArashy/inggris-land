import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FaDoorOpen } from "react-icons/fa";
import { BsCloudCheck } from "react-icons/bs";
import Notification from "./components/Notification";
import "./index.css";
import axios from "axios";

export interface User {
  id?: number;
  username?: string;
  email?: string;
}

// Define props with a user property of type User
interface AccountProps {
  user: User | null;
}

const Account = ({ user }: AccountProps) => {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    newPassword: "",
  });

  
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username ?? "",
        email: user.email ?? "",
        newPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const logout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      if (response) {window.location.href = '/login'};
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const response = await fetch("http://localhost:5000/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure session is sent
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Update failed");

      setFormStatus("success");
    } catch (error) {
      console.error(error);
      setFormStatus("error");
    }
  };

  if(!user) return null;
  else
  return (
    <>
    <div className="max-w-screen-sm mt-12 mx-auto px-4 flex-col gap-3 flex justify-center items-center">
      <FaCircleUser size={"90px"} color="grey"/>
      <h1 className="text-3xl mx-auto text-center">
        Welcome, {user.username}
      </h1>
      <p>
        Manage your profile information here 
      </p>
    </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-screen-md mx-auto">
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            id="username"
            className="w-full border border-black rounded-lg px-4 py-2"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            className="w-full border border-black rounded-lg px-4 py-2"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="newPassword">New Password</label>
          <input
            name="newPassword"
            type="password"
            id="newPassword"
            className="w-full border border-black rounded-lg px-4 py-2"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row gap-10">
          <button type="submit" className="bg-primary-500 text-white rounded-full px-6 py-2 text-base font-semibold transition-transform not-motion-reduce:transform hover:scale-105 hover:bg-primary-400 cursor-pointer flex gap-2 items-center">
            <BsCloudCheck size={"1.5rem"} color="white" />
            Submit!
          </button>
          <button type="button" onClick={logout} className="text-red-500 font-bold flex flex-row gap-1 items-center cursor-pointer hover:underline">
            Logout <FaDoorOpen size={24}/>
          </button>
        </div>
      </form>
      {
        formStatus == "success" &&
        <Notification type="success" message="Account successfully updated!" onClose={() => setFormStatus("idle")}/>
      }
      {
        formStatus == "error" &&
        <Notification type="fail" message="Failure!" onClose={() => setFormStatus("idle")}/>
      }
      {/* <Notification type="alert"/> */}
    </>
  );
};

export default Account;
