import { useContext, useEffect } from "react";
import LayoutHome from "./LayoutHome";

import type { MetaArgs } from "react-router";
import { useNavigate } from "react-router";
import { AuthContext } from "~/hooks/context/AuthContext";

import ServiceRegistration from "~/pages/service/registration/ServiceRegistration";


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
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token]);

  return token && <LayoutHome />;
}

export const routes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/service-registration",
    element: <ServiceRegistration />,
    loader: ({ request }) => {
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
    },
  },
];