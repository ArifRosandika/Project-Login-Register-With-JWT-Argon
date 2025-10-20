"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { IoLogOut, IoPerson } from "react-icons/io5";
import axios from "axios";

interface JwtPayload {
  username: string;
  exp: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function getNewAccessToken() {
    try {
      const res = await axios.post(
        "http://localhost:8080/refresh",
        {},
        { withCredentials: true }
      );
      localStorage.setItem("token", res.data.access_token);
      return res.data.access_token;
    } catch (err) {
      console.error("Failed to refresh token", err);
      localStorage.removeItem("token");
      router.push("/login");
      return null;
    }
  }

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const now = Date.now();

        if (decoded.exp * 1000 < now) {
          const newToken = await getNewAccessToken();
          if (!newToken) return;
          const decodedNew = jwtDecode<JwtPayload>(newToken);
          setUsername(decodedNew.username);
        } else {
          setUsername(decoded.username);
        }
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [router]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

    if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <nav className="bg-blue-600 w-full text-white flex justify-between px-6 py-3">
        <h1 className="font-bold text-lg">My App</h1>
        <div className="flex items-center gap-4">
          <span className="bg-white text-blue-600 p-1 rounded">
            <IoPerson />
          </span>
          {username}
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
          >
            <IoLogOut />
          </button>
        </div>
      </nav>
      <main className="flex-1 flex items-center justify-center">
        <h2 className="text-5xl font-sans text-center">
          Welcome to Dashboard,{" "}
          <span className="text-blue-600 font-bold">{username}</span>
        </h2>
      </main>
    </div>
  );
}
