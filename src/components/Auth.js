import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef, Fragment } from "react";
import Swal from "sweetalert2";

import classes from "./Auth.module.css";
import { authActions } from "../store/auth";

const axios = require("axios").default;

const Auth = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [isLoginReq, setIsLoginReq] = useState(false);

  const enteredEmailIsValid = enteredEmail.trim() !== "";
  const enteredPasswordIsValid = enteredPassword.trim() !== "";

  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const dispatch = useDispatch();

  //
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    let unmounted = false;
    const axiosData = async () => {
      await axios
        .post("http://challenge-react.alkemy.org/", {
          email: enteredEmail,
          password: enteredPassword,
        })
        .then(function (response) {
          setData(response);
          dispatch(authActions.login());
          Swal.fire("You are logged in!", "", "success");
          localStorage.setItem("token", JSON.stringify(data.data.token));
        })
        .catch(function (error) {
          // setData(error.response.data.error);
          Swal.fire("Error login", error.response.data.error, "error");
        });
    };

    axiosData();
    setIsLoading(false);

    return () => {
      unmounted = true;
    };
  }, [isLoginReq]);

  //

  const loginHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsLoginReq(!isLoginReq);
  };

  return (
    <Fragment>
      {!isAuth && (
        <main className={classes.auth}>
          {isLoading && <p>Loading ...</p>}
          <section>
            <form onSubmit={loginHandler}>
              <div className={classes.control}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={enteredEmail}
                  onChange={emailInputChangeHandler}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={enteredPassword}
                  onChange={passwordInputChangeHandler}
                />
              </div>
              {!formIsValid && (
                <p className={classes.alert}>There are empty values</p>
              )}
              <button disabled={!formIsValid || isLoading}>Login</button>
            </form>
          </section>
        </main>
      )}
    </Fragment>
  );
};

export default Auth;
