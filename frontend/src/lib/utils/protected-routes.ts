import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRoutesProps = {
  children: ReactNode;
  role_id: string;
};

export default function ProtectedRoutes(props: ProtectedRoutesProps) {
  const navigate = useNavigate();
  const roleUser = localStorage.getItem("role_id");
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token == null) {
      navigate("/login");
    } else if (roleUser !== props.role_id) {
      navigate("/");
    }
  }, [navigate]);

  return token && roleUser === props.role_id && props.children
    ? props.children
    : null;
}
