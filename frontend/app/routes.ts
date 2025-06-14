import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("my-services", "pages/my-services/my-services.tsx"),
] satisfies RouteConfig;