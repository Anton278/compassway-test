import {
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  type PopoverProps,
} from "@mui/material";
import { useSelector } from "react-redux";

import { selectUser } from "../../../../redux/authSlice/selectors";
import { Logout } from "@mui/icons-material";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { logout } from "../../../../redux/authSlice";
import { LS_KEYS } from "../../../../utils/const";
import { $api } from "../../../../http/api";

interface AvatarMenuProps {
  anchorEl: PopoverProps["anchorEl"];
  onClose: PopoverProps["onClose"];
}

export default function AvatarMenu({ anchorEl, onClose }: AvatarMenuProps) {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    if (onClose) onClose({}, "backdropClick");

    dispatch(logout());
    localStorage.removeItem(LS_KEYS.username);
    localStorage.removeItem(LS_KEYS.password);

    $api.defaults.headers.common["Authorization"] = ``;
  };

  return (
    <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={onClose}>
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
  );
}
