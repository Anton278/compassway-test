import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { REGEXS } from "../../../../utils/const";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

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

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
      <Button variant="contained" sx={{ margintTop: "15px" }} type="submit">
        Login
      </Button>
    </form>
  );
}
