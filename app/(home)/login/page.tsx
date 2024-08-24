"use client";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

import classes from './page.module.css';

function Login() {
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
      localStorage.setItem("auth-token", data.token);
      location.href = "/dashboard";
    } else {
      console.error(data.error);
    }
  };

  return (
    <section className="w-1/2 mx-auto gap-4 p-10 flex flex-col justify-center text-center">
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

      <nav className={classes.link}>
        <Link href={'/forgot_password'}>Forgot Password?</Link>
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
};

export default Login;
