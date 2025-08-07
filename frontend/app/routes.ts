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
    route(
      "historico_pagamento",
      "pages/historico_pagamento/HistoricoPagamento.tsx"
    ),
    route("/perfil", "pages/perfil/Perfil.tsx"),
    route("/perfil/editar", "pages/perfil/EditarPerfil.tsx"),
    route(
      "/servicos_prestados",
      "pages/servicos_prestados/ServicosPrestados.tsx"
    ),
    route(
      "/negociacao_servicos_prestador",
      "pages/negociacao_servicos_prestador/NegociacaoServicosPrestador.tsx"
    ),
    route (
      "/negociacoes/:id",
      "pages/servicos_contratados/ServicoVisaoContratante.tsx"
    ),
    route(
      "/servicos_prestados/service-registration", 
      "pages/service/registration/ServiceRegistration.tsx"
    ),
  ]),
] satisfies RouteConfig;
