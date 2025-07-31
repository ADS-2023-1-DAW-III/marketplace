import { useContext, useEffect } from "react";
import LayoutHome from "./LayoutHome";
import type { MetaArgs } from "react-router";
import { useNavigate } from "react-router";
import { AuthContext } from "~/hooks/context/authContext";

import ServiceRegistration from "~/pages/service/registration/ServiceRegistration";

export function meta(_args: MetaArgs) {
  return [
    { title: "Marketplace" },
    { name: "Marketplace", content: "Bem vindo a seu marketplace de serviços" },
  ];
}

export default function Index() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token]);

  return token && <LayoutHome />;
}

const authLoader = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Response(null, {
      status: 302,
      headers: {
        Location: '/login',
      },
    });
  }
  return null;
};

export const routes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/servicos_prestados/service-registration",
    element: <ServiceRegistration />,
    loader: authLoader,
  },
  {
    path: "/service-registration",
    loader: () => {
      // Redireciona para a nova rota
      throw new Response(null, {
        status: 301,
        headers: {
          Location: '/servicos_prestados/service-registration',
        },
      });
    },
  },
];