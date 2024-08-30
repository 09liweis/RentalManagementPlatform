"use client";
import { showToast } from "@/components/common/Toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import  Link  from "next/link";
import classes from './page.module.css';

function Login() {
  const router = useRouter();

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      showToast("Login Successful");
      localStorage.setItem("auth-token", data.token);
      router.push("/dashboard");
    } else {
      showToast(data.err);
    }
  };

  return (
    <section className="gap-4 p-10 flex flex-col justify-center text-center">
      <h1 className="font-bold text-lg">Please Login as landlord</h1>
      <input
        className="p-3 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="p-3 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <nav className="text-right">
        <Link href="/login/forgot" className="text-black-800 underline decoration-1 underline-offset-4">
          Forgot Password?
        </Link>
      </nav>


      <button
        type="submit"
        onClick={handleLogin}
        className="rounded bg-red-400 text-white p-3"
      >
        Login
      </button>
    </section>
  );
}

export default Login;


