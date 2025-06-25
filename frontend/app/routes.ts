import {type RouteConfig, index, layout, route} from "@react-router/dev/routes";

export default [
    index("routes/index.tsx"),
    layout("routes/LayoutAuth.tsx", [
        route("/login","pages/auth/Login.tsx"),
        route("/register", "pages/auth/Register.tsx"),
    ]),

    layout("routes/LayoutHome.tsx", [
        route("/home", "pages/home/Home.tsx"),
    ]),
] satisfies RouteConfig;
