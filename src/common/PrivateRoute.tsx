/* eslint-disable react/require-default-props */
import { Navigate, Outlet } from "react-router-dom";
import useToken from "../hooks/useToken";

export default function PrivateRoute({
  redirectPath = "/sign-in",
  children,
}: {
  redirectPath?: string;
  children?: React.ReactElement;
}) {
  const token = useToken();

  if (!token) {
    // eslint-disable-next-line react/jsx-max-props-per-line
    return (
      <Navigate
        to={redirectPath}
        replace
      />
    );
  }

  return children || <Outlet />;
}
