import { JSX } from "react";
import { useParams } from "react-router-dom";
import { Home } from "../pages/Home";

interface props {
  children: JSX.Element;
}

export function PrivateRoute({ children }: props) {
  const token = useParams()?.token;

  let access = false;
  access = !!token;

  if (access) {
    return children;
  }

  return <Home />;
}
