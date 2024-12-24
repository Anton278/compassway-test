import { Routes, Route, Navigate } from "react-router";

import HomePage from "./pages/Home";
import { useSelector } from "react-redux";
import { selectIsAuthed } from "./redux/authSlice/selectors";
import EmailPage from "./pages/Email";

interface Route {
  index?: boolean;
  path?: string;
  element: React.ReactNode;
}
type Routes = Route[];

export default function App() {
  const isAuthed = useSelector(selectIsAuthed);

  const publicRoutes: Routes = [
    { index: true, element: <HomePage /> },
    { path: "*", element: <Navigate to="/" /> },
  ];
  const privateRoutes: Routes = [
    { path: "/email", element: <EmailPage /> },
    { path: "*", element: <Navigate to="/email" /> },
  ];

  return (
    <Routes>
      {isAuthed
        ? privateRoutes.map((route, i) => <Route {...route} key={i} />)
        : publicRoutes.map((route, i) => <Route {...route} key={i} />)}
    </Routes>
  );
}
