import { Button, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler } from "react-hook-form";
import { LS_KEYS, REGEXS } from "../../../../utils/const";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { register as registerThunk } from "../../../../redux/authSlice/thunks";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import Typography from "@mui/material/Typography";
import { addApiAuth } from "../../../../utils/addApiAuth";
import type { AxiosError } from "axios";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setError("");
      setIsSubmitting(true);
      await dispatch(registerThunk(data)).unwrap();

      localStorage.setItem(LS_KEYS.username, data.username);
      localStorage.setItem(LS_KEYS.password, data.password);

      addApiAuth(data.username, data.password);
    } catch (err) {
      const error = err as AxiosError;
      console.log({ error });
      setError(
        error.status == 400 ? "Username is taken" : "Failed to create user"
      );
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
        error={!!errors.email}
        label="Email"
        variant="outlined"
        helperText={errors.email?.message || " "}
        {...register("email", {
          required: "This field is required",
          pattern: {
            value: REGEXS.email,
            message: "Invalid email address",
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
        Register
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
