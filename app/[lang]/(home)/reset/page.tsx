import Link from 'next/link';
import Image from 'next/image';
import LinkText from '@/components/common/LinkText';
export default function ResetPassword() {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/backgroundImage.jpg')" }}>
      <div className="absolute inset-0 bg-orange-400 opacity-70"></div>

      <div className="absolute top-32 md:top-24 flex flex-col items-center">
        <Image width={300} height={300} src="/images/backgroundImage.jpg" alt="Logo" className="w-16 h-16 mb-4 md:w-24 md:h-24" />
        <h6 className="text-2xl md:text-3xl font-bold text-white tracking-wide">RentalStudio</h6>
      </div>

      <div
        className="relative z-10 flex flex-col items-center bg-white p-4 md:p-6 rounded-lg shadow-lg mt-30 md:mt-22 w-11/12 max-w-sm md:max-w-md">
        <h2 className="text-lg md:text-xl font-bold text-center mb-2 text-gray-800">
          Please check your email to reset your password.
        </h2>
        <LinkText href="/login">
          Back to Login
        </LinkText>
      </div>
    </div>
  );
}
