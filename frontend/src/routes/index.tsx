import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Redireciona rotas desconhecidas para home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}