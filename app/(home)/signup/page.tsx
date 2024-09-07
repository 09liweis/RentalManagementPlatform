"use client";

import { showToast } from "@/components/common/Toast";
import { fetchData } from "@/utils/http";
import { useRouter } from "next/navigation";

import { useState } from "react";

function Signup() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const {msg,err} = await fetchData({url:"/api/signup",method:"POST",body:{email,password}});

    showToast(msg || err);
    if (!err) {
      router.push("/login");
    }
  };
  return (
    <section className="gap-4 p-10 flex flex-col justify-center text-center">
      <h1 className="font-bold text-lg">Please Sign up as landlord</h1>
      <input
        className="input"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="input"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        onClick={handleSignup}
        className="rounded bg-red-400 text-white p-3"
      >
        Signup
      </button>
    </section>
  );
}

export default Signup;