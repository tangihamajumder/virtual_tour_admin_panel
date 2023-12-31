import { Button, Container, Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/12146011_Wavy_Gen-01_Single-07.jpg";
import CustomSnackBar from "../components/CustomSnackbar.jsx";
import { useUserSignUpMutation } from "../redux/features/auth/authApi.js";

const SignUp = () => {
  const [userSignUp] = useUserSignUpMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      contactNo: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await userSignUp(data).unwrap();
      if (res?.success) {
        setOpen(true);
        setSeverity("success");
        setSnackbarMessage(res?.message);
        setTimeout(() => {
          navigate("/sign-in");
        }, 2100);
      } else {
        setOpen(true);
        setSeverity("error");
        setSnackbarMessage("Please enter valid credentials");
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <Container>
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
          <Typography variant="h4" gutterBottom>
            User Registration
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email")}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register("password")}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  label="Contact Number"
                  fullWidth
                  margin="normal"
                  error={!!errors.contactNo}
                  helperText={errors.contactNo?.message}
                  {...register("contactNo")}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  {...register("firstName")}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  {...register("lastName")}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                type={"submit"}
                size={"large"}
                variant={"contained"}
                color={"secondary"}
                sx={{ minWidth: "20vw" }}
              >
                create
              </Button>
            </Box>
          </form>
          <Typography variant={"subtitle1"} sx={{ mt: 3 }}>
            Already have an account? <Link to={"/sign-in"}>Sign in</Link>
          </Typography>
        </Grid>
      </Grid>
      <CustomSnackBar
        open={open}
        setOpen={setOpen}
        message={snackbarMessage}
        severity={severity}
      />
    </Container>
  );
};

export default SignUp;
