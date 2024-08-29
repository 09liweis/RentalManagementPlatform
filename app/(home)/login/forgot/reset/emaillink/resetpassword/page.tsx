import Link from 'next/link';

export default function ResetPassword() {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/backgroundImage.jpg')" }}>

      <div className="absolute inset-0 bg-blue-500 opacity-70"></div>

      {/* 将表单容器提高z-index以确保其显示在覆盖层上，并保持不透明 */}
      <div className="relative z-10 bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-center text-2xl font-bold mb-6">Reset Password</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full p-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M12 11c-1.1 0-2 .9-2 2m0 0v1.5m0-1.5a2 2 0 114 0v1.5m-4-1.5h4"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M16 11V9.94c0-1.148-.834-2.14-1.986-2.367C12.868 7.24 12 8.027 12 9v2m-4 0v6m0 0a2 2 0 004 0v-6a2 2 0 00-4 0z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M12 11c-1.1 0-2 .9-2 2m0 0v1.5m0-1.5a2 2 0 114 0v1.5m-4-1.5h4"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M16 11V9.94c0-1.148-.834-2.14-1.986-2.367C12.868 7.24 12 8.027 12 9v2m-4 0v6m0 0a2 2 0 004 0v-6a2 2 0 00-4 0z"></path>
                </svg>
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Reset Password
          </button>
        </form>
      </div>

    </div>
  );
}
