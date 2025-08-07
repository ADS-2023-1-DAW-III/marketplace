import { useContext, useEffect, useState } from "react";
import LayoutHome from "./LayoutHome";

import type { MetaArgs } from "react-router";
import { useNavigate } from "react-router";
import { AuthContext } from "~/hooks/context/authContext";
import { useApi } from "~/hooks/services/api";
import type { AxiosError } from "axios";

export function meta(_args: MetaArgs) {
  return [
    { title: "Marketplace" },
    { name: "Marketplace", content: "Bem vindo a seu markteplace de serviços" },
  ];
}

export default function Index() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const api = useApi();
  const [loading, setLoading] = useState(true);

  const heathly = async () => {
    try {
      const response = await api.get("/servicos");
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      return [200, 202, 204].includes(response.status);
    } catch (error) {
      console.error("Erro ao verificar a saúde do serviço:", error);
      return false;
    }
  };

  const handleHealthy = () => {
    setLoading(false);
  };

  const handleUnhealthy = () => {
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      heathly()
        .then((isHealthy) => {
          if (isHealthy) {
            handleHealthy();
          } else {
            throw new Error("Serviço indisponível");
          }
        })
        .catch((error: AxiosError) => {
          handleUnhealthy();
        });
    }
  }, [token]);

  return token && !loading && <LayoutHome />;
}
