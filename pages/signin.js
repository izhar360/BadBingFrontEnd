import React, { useContext, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { UserContext } from "../src/Context/userContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const router = useRouter();
  const [error, setError] = useState(null);

  const {
    setRegistraion,
    userLogin,
    handleSubmit,
    successLog,
    register,
    watch,
    errors,
  } = React.useContext(UserContext);

  useEffect(() => {
    setRegistraion("signin");
  }, []);
  useEffect(() => {
    if (successLog) {
      router.push("/");
    }
  }, [successLog]);

  // const [userData, setUserData] = useState({
  //   email: "",
  //   password: "",
  // });

  const login = async (data) => {
    userLogin(data);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Head>
        <title>Sign In | Login - Bada Bing</title>
      </Head>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error && (
          <Typography
            style={{ marginBottom: "10px" }}
            component="h1"
            variant="h5"
            color="error"
          >
            {error}
          </Typography>
        )}
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(login)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            // onChange={(e) =>
            //   setUserData({ ...userData, email: e.target.value })
            // }
            {...register("email")}
          />
          <Typography>{errors["email"]?.message}</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            // onChange={(e) =>
            //   setUserData({ ...userData, password: e.target.value })
            // }
            {...register("password")}
          />
          <Typography>{errors["password"]?.message}</Typography>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
