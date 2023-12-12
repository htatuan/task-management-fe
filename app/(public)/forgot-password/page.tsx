import ForgotPasswordForm from "./form";

const ForgotPasswordPage = () => {

  return (
    <div
      className="h-screen flex flex-col  
                    items-center justify-center"
    >
      <p className="text-green-700 text-xl mb-3">Forgot your password?</p>
      <div className="w-full max-w-xs">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
