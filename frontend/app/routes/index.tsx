import { useContext, useEffect } from "react";
import LayoutHome from "./LayoutHome";

import type { MetaArgs } from "react-router";
import { useNavigate } from "react-router";
import { AuthContext } from "~/hooks/context/AuthContext";

export function meta(_args: MetaArgs) {
  return [
    { title: "Marketplace" },
    { name: "Marketplace", content: "Bem vindo a seu markteplace de serviços" },
  ];
}

export default function Index() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Token mudou para:", token);
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token]);

  return token && <LayoutHome />;
}
