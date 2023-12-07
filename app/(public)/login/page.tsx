import LoginForm from "./form";

const LoginPage = () => {

  return (
    <div
      className="h-screen flex flex-col  
                    items-center justify-center"
    >
      <p className="text-green-700 text-xl mb-3">Welcome to Task Management</p>
      <div className="w-full max-w-xs">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
