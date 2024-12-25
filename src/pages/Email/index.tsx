import { Logout } from "@mui/icons-material";
import {
  AppBar,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice/selectors";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logout } from "../../redux/authSlice";
import { LS_KEYS } from "../../utils/const";
import { $api } from "../../http/api";
import SendEmail from "../../components/Business/SendEmail";

export default function EmailPage() {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    setAnchorEl(null);

    dispatch(logout());
    localStorage.removeItem(LS_KEYS.username);
    localStorage.removeItem(LS_KEYS.password);

    $api.defaults.headers.common["Authorization"] = ``;
  };

  return (
    <>
      <AppBar position="static">
        <Container
          fixed
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ margin: 0 }}>Compassway test</h3>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            <div style={{ width: "270px" }}>
              <div style={{ padding: "0 10px" }}>
                <Typography
                  sx={{
                    textWrap: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  Username: <b>{user.username}</b>
                </Typography>
                <Typography
                  sx={{
                    textWrap: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                  style={{ margin: "8px 0" }}
                >
                  email: <b>{user.email}</b>
                </Typography>
              </div>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </div>
          </Menu>
        </Container>
      </AppBar>
      <Container maxWidth="md">
        <SendEmail />
      </Container>
    </>
  );
}
