import { Routes, Route, Navigate } from "react-router";
import { useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";

import HomePage from "./pages/Home";
import { selectIsAuthed } from "./redux/authSlice/selectors";
import EmailPage from "./pages/Email";
import { useEffect, useState } from "react";
import { LS_KEYS } from "./utils/const";
import { getCurrentUser as getCurrentUserThunk } from "./redux/authSlice/thunks";
import { useAppDispatch } from "./hooks/useAppDispatch";

interface Route {
  index?: boolean;
  path?: string;
  element: React.ReactNode;
}
type Routes = Route[];

export default function App() {
  const dispatch = useAppDispatch();
  const isAuthed = useSelector(selectIsAuthed);
  const [showUserReqError, setShowUserReqError] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      const username = localStorage.getItem(LS_KEYS.username);
      const password = localStorage.getItem(LS_KEYS.password);

      if (!username || !password) {
        return;
      }

      try {
        await dispatch(getCurrentUserThunk({ username, password })).unwrap();
      } catch (err) {
        setShowUserReqError(true);
      }
    };

    getCurrentUser();
  }, []);

  const publicRoutes: Routes = [
    { index: true, element: <HomePage /> },
    { path: "*", element: <Navigate to="/" /> },
  ];
  const privateRoutes: Routes = [
    { path: "/email", element: <EmailPage /> },
    { path: "*", element: <Navigate to="/email" /> },
  ];

  return (
    <>
      <Routes>
        {isAuthed
          ? privateRoutes.map((route, i) => <Route {...route} key={i} />)
          : publicRoutes.map((route, i) => <Route {...route} key={i} />)}
      </Routes>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showUserReqError}
        onClose={() => setShowUserReqError(false)}
        autoHideDuration={6000}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          Failed to get user
        </Alert>
      </Snackbar>
    </>
  );
}
