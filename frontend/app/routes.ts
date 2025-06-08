import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("create-service", "routes/create-service.tsx"),
] satisfies RouteConfig;
