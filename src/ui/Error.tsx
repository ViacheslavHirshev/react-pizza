import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function NotFound() {
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      {isRouteErrorResponse(error) ? (
        <p>{error.data}</p>
      ) : error instanceof Error ? (
        <p>{error.message}</p>
      ) : (
        <p>Unknown error: {error as string}</p>
      )}
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
