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
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Link } from "react-router-dom";
import { Footer } from "react-day-picker";
import { SiteFooter } from "@/components/site-footer";

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
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Register Now
        </CardTitle>
        <CardDescription className="text-center">
          Join 21CMS to unlock exclusive insights.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
          <Button type="submit" className="w-full" disabled={loading}>
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handle.trim()) {
      navigate(`/view/${handle.toLowerCase()}`);
    } else {
      toast.error("❌ Please enter a valid user handle.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          View Attendance Stats
        </CardTitle>
        <CardDescription className="text-center">
          Enter your roll number to check your attendance stats.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            placeholder="Roll Number"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
          />
          <Button type="submit" className="w-full">
            View Stats
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export function Homepage() {
  return (
    <div className="min-h-screen flex flex-col px-4 text-foreground bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-black dark:via-gray-900 dark:to-black">
      <header className="p-6 flex justify-between items-center">
        <div className="text-3xl font-bold tracking-tight">
          <Link to="">21CMS</Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="px-4 py-2 border rounded">
            <Link to="/about">About </Link>
          </div>

          <a
            href="https://github.com/21Cash/21Cms"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border rounded"
          >
            Star on GitHub
          </a>
          <ModeToggle />
        </div>
      </header>
      <main className="flex-1 flex flex-col justify-center items-center space-y-10">
        <div className="text-center">
          <h1 className="mb-8 text-6xl font-semibold">Welcome to 21CMS</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Unlock a superior user experience and deeper insights—register now
            for an enhanced UI and comprehensive analytics.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <RegisterForm />
          <AttendanceStatsForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
