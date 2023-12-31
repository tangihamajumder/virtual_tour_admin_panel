import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import loginImage from "../assets/12146011_Wavy_Gen-01_Single-07.jpg";
import CustomSnackBar from "../components/CustomSnackbar.jsx";
import { useUserSignInMutation } from "../redux/features/auth/authApi.js";
import setToLocalStorage from "../utils/setToLocalStorage.js";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [signIn] = useUserSignInMutation();

  const onSubmit = async (data) => {
    const res = await signIn(data).unwrap();
    if (res?.success) {
      setToLocalStorage("Token", res?.data);
      setOpen(true);
      setSeverity("success");
      setSnackbarMessage(res?.message);
      setTimeout(() => {
        navigate("/");
      }, 2100);
    } else {
      setOpen(true);
      setSeverity("error");
      setSnackbarMessage("Please enter valid credentials");
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid
          container
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ height: "100%", padding: 10 }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={loginImage}
              alt={"login image"}
              style={{ height: 500, width: 500 }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant={"h3"} sx={{ mb: 10 }}>
              Login
            </Typography>
            <TextField
              fullWidth
              placeholder={"Enter email"}
              label={"Email"}
              sx={{ mb: 5, width: { md: "30vw", xs: "80vw" } }}
              {...register("email", {
                required: "Email is required",
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              placeholder={"Enter password"}
              label={"Password"}
              type={showPassword ? "text" : "password"}
              sx={{ mb: 5, width: { md: "30vw", xs: "80vw" } }}
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type={"submit"}
              size={"large"}
              variant={"contained"}
              color={"secondary"}
            >
              Login
            </Button>
            <Typography variant={"subtitle1"} sx={{ mt: 3 }}>
              Dont have an account?{" "}
              <Link to={"/sign-up"}>Create An Account</Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
      <CustomSnackBar
        open={open}
        setOpen={setOpen}
        message={snackbarMessage}
        severity={severity}
      />
    </Container>
  );
};

export default SignIn;
