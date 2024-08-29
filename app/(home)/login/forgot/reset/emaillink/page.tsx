
export default function EmailLink(){

  return (
    <div className="bg-gray-100 p-8 max-w-lg mx-auto">
      {/*<div className="text-center mb-4">*/}
      {/*  <img src="your-logo-url-here.png" alt="Logo" className="mx-auto mb-4"/>*/}
      {/*</div>*/}
      <div className="bg-white p-6 shadow-md rounded">
        <p className="text-gray-700 mb-4">Hi there,</p>
        <p className="text-gray-700 mb-4">
          You have requested to have your password reset for your account. To continue, click the button below:
        </p>
        <div className="text-center mb-4">
          <a href="/login/forgot/reset/emaillink/resetpassword/"
             className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-600">
            RESET PASSWORD
          </a>
        </div>
        <p className="text-gray-500 text-center text-sm mb-4">
          If you received this email in error, you can safely ignore this email.
        </p>
        <p className="text-gray-700">
          Please do not hesitate to send an email to
          <a href="mailto:help@landlordstudio.com" className="text-blue-500 hover:underline">
            help@landlordstudio.com
          </a> if you have any questions.
        </p>
        <p className="text-gray-700 mt-4">Thanks,</p>
      </div>
    </div>
  );
}



