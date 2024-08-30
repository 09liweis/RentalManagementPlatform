"use client";
import { showToast } from "@/components/common/Toast";
import Input from "@/components/common/Input";
import { useRouter } from "next/navigation";

import { useState } from "react";

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
      <Input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        value={email}
      />
      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        value={password}
      />
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
