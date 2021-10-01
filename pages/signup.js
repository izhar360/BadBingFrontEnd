import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
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
    marginTop: theme.spacing(4),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const router = useRouter();
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState(null);

  const {
    setRegistraion,
    userSignUp,
    successLog,
    handleSubmit,
    register,
    watch,
    errors,
  } = React.useContext(UserContext);

  useEffect(() => {
    setRegistraion("signup");
  }, []);

  useEffect(() => {
    if (successLog) {
      router.push("/");
    }
  }, [successLog]);

  // const [userData, setUserData] = useState({
  //   email: "",
  //   password: "",
  //   passwordConfirm: "",
  //   firstName: "",
  //   lastName: "",
  // });

  const submitForm = async (data) => {
    console.log("submit=>", data);
    userSignUp(data);
  };

  // const onSubmit = (data) => console.log(data, "skksk");
  // console.log(errors, "ee");
  //console.log(watch());

  // const setFormData = (e) => {
  //   setUserData({ ...userData, [e.target.name]: e.target.value });
  //   console.log([e.target.name], e.target.value);
  // };

  return (
    <Container component="main" maxWidth="xs">
      <Head>
        <title>Sign Up - Bada Bing</title>
      </Head>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
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
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(submitForm)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                // onChange={(e) =>
                //   setUserData({ ...userData, firstName: e.target.value })
                // }
                {...register("firstName")}
              />
              <Typography>{errors["firstName"]?.message}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                // onChange={(e) => setFormData(e)}
                {...register("lastName")}
              />
              <Typography>{errors["lastName"]?.message}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                //  onChange={(e) => setFormData(e)}
                {...register("email")}
              />
              <Typography>{errors["email"]?.message}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                //  onChange={(e) => setFormData(e)}
                {...register("password")}
              />
              <Typography>{errors["password"]?.message}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                //  onChange={(e) => setFormData(e)}
                {...register("passwordConfirm")}
              />
              <Typography>{errors["passwordConfirm"]?.message}</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
