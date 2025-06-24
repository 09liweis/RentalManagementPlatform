"use client";
import { useState } from "react";
import useAppStore from "@/stores/appStore";
import { fetchData } from "@/utils/http";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import LinkText from "@/components/common/LinkText";
import FormWrapper from "@/components/common/form/FormWrapper";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { showToast } from "@/components/common/Toast";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const { t } = useAppStore();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      showToast("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const { msg, err } = await fetchData({
        url: "/api/sendemail",
        body: { email },
        method: "POST",
      });

      if (err) {
        showToast(err);
      } else {
        showToast(msg || "Password reset email sent successfully!");
        setEmailSent(true);
      }
    } catch (error) {
      showToast("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (emailSent) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        variants={successVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 max-w-md w-full mx-4 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-green-100 rounded-full opacity-70"></div>
          <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-blue-100 rounded-full opacity-70"></div>

          {/* Success icon */}
          <motion.div
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>

          <motion.h2
            className="text-2xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Check Your Email
          </motion.h2>

          <motion.p
            className="text-gray-600 mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            We've sent a password reset link to <strong>{email}</strong>. Please
            check your email and follow the instructions to reset your password.
          </motion.p>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <LinkText
              href="/login"
              text="Back to Login"
              className="inline-block w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 text-center"
            />

            <button
              onClick={() => setEmailSent(false)}
              className="w-full text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Didn't receive the email? Try again
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <FormWrapper onSubmit={handleSubmit}>
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t("home.ForgotPassword")}?
          </h1>
          <p className="text-gray-600 leading-relaxed">{t("home.DontWorry")}</p>
        </motion.div>

        {/* Email Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Input
            type="email"
            placeholder={t("home.Email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus={true}
            disabled={loading}
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            tl={loading ? <LoadingSpinner /> : t("home.ResetPassword")}
            handleClick={() => {}}
            disabled={loading}
            fullWidth={true}
            className="group relative overflow-hidden"
          />
        </motion.div>

        {/* Back to Login Link */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <LinkText
            href="/login"
            text="Back to Login"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm font-medium flex items-center justify-center gap-2"
          />
        </motion.div>

        {/* Help Text */}
        <motion.div
          className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-start space-x-3">
            <svg
              className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-1">
                Need Help?
              </h3>
              <p className="text-sm text-blue-800">
                If you don't receive the email within a few minutes, please
                check your spam folder or contact support.
              </p>
            </div>
          </div>
        </motion.div>
      </FormWrapper>
    </motion.div>
  );
}
