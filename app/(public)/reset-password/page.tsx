import ResetPassword from "./form";

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
