type ErrorResponse = {
  message: string;
  code: string;
  statusCode: string;
};
export const formatErrorResponse = (error: any): ErrorResponse => {
  const errorRes = JSON.parse(JSON.stringify(error));
  return errorRes.response.errors[0];
};
