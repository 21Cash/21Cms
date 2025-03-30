import axios from "axios";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { backendUrl } from "@/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [rollno, setRollno] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/register-user`, {
        userId: rollno.toLowerCase(),
        username,
        password,
      });

      if (response.status !== 200) throw new Error("Registration failed");

      toast.success("✅ Registration Successful!", {
        description: "You can now log in to your account.",
        duration: 4000,
      });

      setRollno("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
      toast.error("❌ Registration Failed", {
        description: "Please check your credentials and try again.",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gray-800 border border-gray-700 shadow-xl rounded-lg hover:shadow-2xl transition-shadow">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-center text-2xl font-bold">
          Register Now
        </CardTitle>
        <CardDescription className="text-center text-gray-300">
          Join 21CMS to unlock exclusive insights.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            placeholder="Roll Number"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
            disabled={loading}
          />
          <Input
            placeholder="Preferred Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <Button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-500 transition-colors py-3"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const AttendanceStatsForm = () => {
  const [handle, setHandle] = useState("");
  const navigate = useNavigate();

  return (
    <Card className="bg-gray-800 border border-gray-700 shadow-xl rounded-lg hover:shadow-2xl transition-shadow">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-center text-2xl font-bold">
          View Attendance Stats
        </CardTitle>
        <CardDescription className="text-center text-gray-300">
          Enter your user handle to check your attendance stats.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <form className="space-y-5">
          <Input
            placeholder="User Handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
          />
          <Button
            onClick={() => {
              navigate(`/view/${handle.toLowerCase()}`);
            }}
            className="w-full bg-gray-600 hover:bg-gray-500 transition-colors py-3"
          >
            View Stats
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export function Homepage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800 text-white">
      <header className="p-6 flex justify-between items-center">
        <div className="text-3xl font-bold tracking-tight">21CMS</div>
        <nav>
          <a
            href="https://github.com/21Cash/21Cms"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-gray-500 rounded hover:bg-gray-600 transition-colors"
          >
            Star on GitHub
          </a>
        </nav>
      </header>
      <main className="flex-1 flex flex-col justify-center items-center px-4 space-y-10">
        <div className="text-center">
          <h1 className="text-6xl font-semibold mb-4">Welcome to 21CMS</h1>
          <p className="text-xl mb-4 max-w-2xl mx-auto">
            Unlock a superior user experience and deeper insights—register now
            for an enhanced UI and comprehensive analytics.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <RegisterForm />
          <AttendanceStatsForm />
        </div>
      </main>
      <footer className="p-3 text-center border-t border-gray-700">
        <p className="text-sm text-gray-400">21CMS By Sushil L</p>
      </footer>
    </div>
  );
}
