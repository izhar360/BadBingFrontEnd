import React, { createContext, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { SignInUser, SignUpUser } from "../api/index";

const UserContext = createContext();

// const getuserfromLocalStrorage = () => {
//     return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {username: null,token: null}
// }
const getuserfromLocalStrorage = () => {
  return localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : { username: null, token: null };
};

// let schema = yup.object().shape({
//   firstName: yup.string().required("Firstname is required"),
//   lastName: yup.string().required("Lastname is required"),
//   email: yup.string().email().required("Email is required"),
//   password: yup.string().required("Password is required (8 min char)").min(8),
//   passwordConfirm: yup
//     .string()
//     .required("Confirm Password")
//     .oneOf([yup.ref("password"), null], "Passwords does not match"),
// });

function UserProvider({ children }) {
  //  const [user,setUser] = useState(getuserfromLocalStrorage())
  const [user, setUser] = useState({ username: null, token: null });
  const [successLog, setSuccessLog] = useState(false);
  const [schema, setSchema] = useState(null);
  const [registraion, setRegistraion] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (registraion === "signup") {
      const schemaX = yup.object().shape({
        firstName: yup.string().required("Firstname is required"),
        lastName: yup.string().required("Lastname is required"),
        email: yup.string().email().required("Email is required"),
        password: yup
          .string()
          .required("Password is required (8 min char)")
          .min(8),
        passwordConfirm: yup
          .string()
          .required("Confirm Password")
          .oneOf([yup.ref("password"), null], "Passwords does not match"),
      });
      setSchema(schemaX);
    } else {
      const schemaX = yup.object().shape({
        email: yup.string().email().required("Email is required"),
        password: yup
          .string()
          .required("Password is required (8 min char)")
          .min(8),
      });
      setSchema(schemaX);
    }
  }, [registraion]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setUser(getuserfromLocalStrorage());
  }, []);

  const userSignUp = async (userProp) => {
    try {
      const { data } = await SignUpUser({ ...userProp });

      const {
        token,
        data: {
          user: { email, firstName, _id },
        },
      } = data;
      const newUser = { email, firstName, token, _id };
      setUser(newUser);

      localStorage.setItem("userData", JSON.stringify(newUser));
      setSuccessLog(true);

      console.log("signed up successfully..!");
    } catch (error) {
      console.log(error, "couldn't sign up, from signup api...");
      setError(error);

      setSuccessLog(false);
    }
  };

  const userLogin = async (userProp) => {
    try {
      const { data } = await SignInUser({ ...userProp });

      const {
        token,
        data: {
          user: { email, firstName, _id },
        },
      } = data;

      const newUser = { email, firstName, token, _id };
      setUser(newUser);
      localStorage.setItem("userData", JSON.stringify(newUser));
      setSuccessLog(true);
    } catch (error) {
      console.log(error);
      setError(error);
      setSuccessLog(false);
    }
  };

  const userLogout = () => {
    setUser({ email: null, firstName: null, token: null, _id: null });
    localStorage.removeItem("userData");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        error,
        userSignUp,
        userLogin,
        successLog,
        userLogout,
        register,
        handleSubmit,
        watch,
        errors,
        setRegistraion,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
