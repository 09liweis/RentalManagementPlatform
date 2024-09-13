"use client";
import { showToast } from "@/components/common/Toast";
import Input from "@/components/common/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";

import  Link  from "next/link";
import useUserStore from "@/stores/userStore";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import {EMAIL} from "@/constants/text";

function Login() {
  const { login } = useUserStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { err } = await login({ email, password });
    if (!err) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="gap-4 p-10 flex flex-col justify-center text-center">
      <h1 className="font-bold text-lg">Please Login as landlord</h1>
      <Input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder={EMAIL}
        value={email}
      />
      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        value={password}
      />

      <nav className="text-right">
        <Link href="/forgotpassword" className="text-black-800 underline decoration-1 underline-offset-4">
          Forgot Password?
        </Link>
      </nav>


      <button
        type="submit"
        disabled={loading}
        className="button"
      >
        {loading ? <LoadingSpinner /> : "Login"}
      </button>
    </form>
  );
}

// @ts-ignore
export default Login;


