import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Tabs, Tab, AppBar } from "@mui/material";
import { useState } from "react";
import RegisterForm from "../../components/Business/Forms/Register";
import LoginForm from "../../components/Business/Forms/Login";

export default function HomePage() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTabIdx(newValue);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <AppBar position="static">
        <Container fixed>
          <h3>Compassway test</h3>
        </Container>
      </AppBar>
      <Container maxWidth="sm" sx={{ flexGrow: 1 }}>
        <Box sx={{ marginTop: "100px" }}>
          <Tabs
            value={activeTabIdx}
            onChange={handleChange}
            sx={{ marginBottom: "40px" }}
            centered
          >
            <Tab label="Register" />
            <Tab label="Login" />
          </Tabs>
          {activeTabIdx === 0 && <RegisterForm />}
          {activeTabIdx === 1 && <LoginForm />}
        </Box>
      </Container>
    </div>
  );
}
