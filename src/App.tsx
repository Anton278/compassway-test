import { Routes, Route } from "react-router";

import HomePage from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  );
}
