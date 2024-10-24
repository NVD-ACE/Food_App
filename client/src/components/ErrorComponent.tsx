import { useRouteError } from "react-router-dom";

function ErrorComponent() {
  const error = useRouteError() as { statusText?: string; message?: string };
  console.error(error); // Để kiểm tra lỗi trong console

  return (
    <div>
      <h1>Oops! Something went wrong!</h1>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}

export default ErrorComponent;
