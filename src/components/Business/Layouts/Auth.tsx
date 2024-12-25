import { Container } from "@mui/material";
import { type CSSProperties, type ReactNode } from "react";

import Header from "../Header";

interface AuthLayoutProps {
  children?: ReactNode;
  containerStyle?: CSSProperties;
}

export default function AuthLayout({
  children,
  containerStyle,
}: AuthLayoutProps) {
  return (
    <>
      <Header containerMaxWidth="sm" />
      <Container maxWidth="sm" style={containerStyle}>
        {children}
      </Container>
    </>
  );
}
