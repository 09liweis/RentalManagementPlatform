"use client";
import { showToast } from "@/components/common/Toast";
import Input from "@/components/common/Input";
import { useRouter } from "next/navigation";

import { useState } from "react";
import useUserStore from "@/stores/userStore";
import LoadingSpinner from "@/components/common/LoadingSpinner";

function Login() {
  const { login } = useUserStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { err } = await login({ email, password });
    if (!err) {
      router.push("/dashboard");
    } else {
      setLoading(false);
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
        disabled={loading}
        className="rounded bg-red-400 text-white p-3"
      >
        {loading ? <LoadingSpinner /> : "Login"}
      </button>
    </section>
  );
}

export default Login;
