import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}
