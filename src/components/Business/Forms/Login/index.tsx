import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { LS_KEYS, REGEXS } from "../../../../utils/const";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

import { addApiAuth } from "../../../../utils/addApiAuth";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { login } from "../../../../redux/authSlice/thunks";

type Inputs = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsSubmitting(true);
      await dispatch(login(data)).unwrap();

      localStorage.setItem(LS_KEYS.username, data.username);
      localStorage.setItem(LS_KEYS.password, data.password);

      addApiAuth(data.username, data.password);
    } catch {
      setError("Failed to login. Try another creds");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column", rowGap: "15px" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        error={!!errors.username}
        label="Username"
        variant="outlined"
        helperText={errors.username?.message || " "}
        {...register("username", {
          required: "This field is required",
          pattern: {
            value: REGEXS.username,
            message: "Letters, digits and @/./+/-/_ only",
          },
          maxLength: {
            value: 150,
            message: "150 characters or fewer",
          },
        })}
      />
      <TextField
        type={showPassword ? "text" : "password"}
        error={!!errors.password}
        label="Password"
        variant="outlined"
        helperText={errors.password?.message || " "}
        {...register("password", {
          required: "This field is required",
          maxLength: {
            value: 128,
            message: "128 characters or fewer",
          },
        })}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Button
        variant="contained"
        sx={{ margintTop: "15px" }}
        type="submit"
        disabled={isSubmitting}
      >
        Login
      </Button>
      {error && (
        <Typography
          color={"error"}
          sx={{ textAlign: "center", marginTop: "5px" }}
        >
          {error}
        </Typography>
      )}
    </form>
  );
}
