import ResetPassword from "./reset-password";

const Page = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined;
  };
}) => {
  const forgotPasswordToken = searchParams["verify"] ?? "";

  return (
    <div>
      <ResetPassword forgotPasswordToken={forgotPasswordToken} />
    </div>
  );
};

export default Page;
