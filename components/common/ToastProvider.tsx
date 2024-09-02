"use client";

import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";
// @ts-ignore
import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}
// test

export default function ToastProvider({ children }: ToastProviderProps) {

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}