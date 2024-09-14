"use client";

import { showToast } from "@/components/common/Toast";
import Input from "@/components/common/Input";
import { fetchData } from "@/utils/http";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { EMAIL } from "@/constants/text";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Link from "next/link";

function Signup() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    const {msg,err} = await fetchData({url:"/api/signup",method:"POST",body:{email,password}});
    setLoading(false);

    showToast(msg || err);
    if (!err) {
      router.push("/login");
    }
  };
  return (
    <section className="auth-form">
      <h1 className="font-bold text-lg">Please Sign up as landlord</h1>
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
      <Link href={'/login'}>Already has an account? Login</Link>
      <button
        type="submit"
        onClick={handleSignup}
        className="rounded bg-red-400 text-white p-3"
      >
        {loading ? <LoadingSpinner /> : "Sign Up"}
      </button>
    </section>
  );
}

export default Signup;