import {
  AppBar,
  Avatar,
  type Breakpoint,
  Container,
  IconButton,
} from "@mui/material";
import { useState } from "react";

import AvatarMenu from "./AvatarMenu";
import { useSelector } from "react-redux";
import { selectIsAuthed } from "../../../redux/authSlice/selectors";

interface HeaderProps {
  containerMaxWidth: Breakpoint;
}

export default function Header({ containerMaxWidth = "md" }: HeaderProps) {
  const isAuthed = useSelector(selectIsAuthed);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <AppBar position="static">
      <Container
        maxWidth={containerMaxWidth}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        sx={{ minHeight: "40px" }}
      >
        <h3 style={{ margin: 0 }}>Compassway test</h3>
        {isAuthed && (
          <>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar sx={{ width: 32, height: 32 }} />
            </IconButton>
            <AvatarMenu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} />
          </>
        )}
      </Container>
    </AppBar>
  );
}
