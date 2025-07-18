import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/LayoutAuth.tsx", [
    route("/login", "pages/auth/Login.tsx"),
    route("/register", "pages/auth/Register.tsx"),
  ]),
  layout("routes/index.tsx", [
    index("pages/home/Home.tsx"),
    route("contratados", "pages/servicos_contratados/Contratados.tsx"),
    route("historico_pagamento", "pages/pagamento/HistoricoPagamento.tsx"),
  ]),
] satisfies RouteConfig;
