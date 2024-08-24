import Link from 'next/link';

export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {/*<img*/}
        {/*  src="/house-icon.svg"*/}
        {/*  alt="House Icon"*/}
        {/*  className="mx-auto mb-4"*/}
        {/*/>*/}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Forgot Password?
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't worry, just enter the email address you registered with and we
          will send you a password reset link.
        </p>
        <form className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Reset Password
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
          <Link href="/login" className="text-blue-500 hover:underline">
            Go back to login
          </Link>
        </div>
      </div>
    </div>
  );
}