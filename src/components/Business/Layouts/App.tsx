import { Container } from "@mui/material";
import { type ReactNode } from "react";

import Header from "../Header";

interface AppLayoutProps {
  children?: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header containerMaxWidth="md" />
      <Container maxWidth="md">{children}</Container>
    </>
  );
}
