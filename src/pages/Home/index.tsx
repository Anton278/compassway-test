import Box from "@mui/material/Box";
import { Tabs, Tab } from "@mui/material";
import { useState } from "react";

import RegisterForm from "../../components/Business/Forms/Register";
import LoginForm from "../../components/Business/Forms/Login";
import AuthLayout from "../../components/Business/Layouts/Auth";

export default function HomePage() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <AuthLayout containerStyle={{ flexGrow: 1 }}>
        <Box sx={{ marginTop: "100px" }}>
          <Tabs
            value={activeTabIdx}
            onChange={(_, newValue) => setActiveTabIdx(newValue)}
            sx={{ marginBottom: "40px" }}
            centered
          >
            <Tab label="Register" />
            <Tab label="Login" />
          </Tabs>
          {activeTabIdx === 0 && <RegisterForm />}
          {activeTabIdx === 1 && <LoginForm />}
        </Box>
      </AuthLayout>
    </div>
  );
}
