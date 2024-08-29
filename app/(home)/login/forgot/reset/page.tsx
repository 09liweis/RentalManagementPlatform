import Link from 'next/link';

export default function ResetPassword() {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/backgroundImage.jpg')" }}>
      <div className="absolute inset-0 bg-blue-500 opacity-70"></div>

      <div className="absolute top-32 md:top-24 flex flex-col items-center">
        <img src="/images/backgroundImage.jpg" alt="Logo" className="w-16 h-16 mb-4 md:w-24 md:h-24" /> {/* 替换为正确的 logo 路径 */}
        <h6 className="text-2xl md:text-3xl font-bold text-white tracking-wide">RentalStudio</h6>
      </div>

      <div className="relative z-10 flex flex-col items-center bg-white p-6 md:p-8 rounded-lg shadow-lg mt-40 md:mt-32 w-11/12 max-w-sm md:max-w-md">
        <h2 className="text-0.5xl md:text-1xl font-bold text-center mb-4 text-gray-800">
          Please check your email to reset your password.
        </h2>
        <Link href="/login" legacyBehavior>
          <a
            className="bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Back to Login
          </a>
        </Link>
      </div>
    </div>
  );
}
