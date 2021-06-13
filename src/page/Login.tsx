import React, { useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import { selectPosts } from "../redux_tool/postSlice";
import { userAuth, confirmAuth } from "../redux_tool/userSlice";
import { useSelector, useDispatch } from "react-redux";
import "./Login.css";
import Header from "../components/Header/Header";
import { makeStyles } from "@material-ui/styles";
import { User } from "../types";

const useStyles = makeStyles({
  margin: {
    marginTop: 30,
  },
});

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const classes = useStyles();

  const loginUser = {
    email: process.env.REACT_APP_LOGIN_EMAIL,
    password: process.env.REACT_APP_LOGIN_PASSWORD,
  };

  const changeEmailText = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const changePasswordText = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const confirmSubmit = () => {
    const userData = { user: { email: email, password: password } };
    dispatch(userAuth(userData));
  };

  return (
    <div>
      <Header />
      <div className="login_main">
        <div className="login-wrap">
          <div className="login_input-area">
            <p className="top-text">管理者認証画面</p>
            <form className="input-form">
              <TextField
                className="text"
                id="input-with-icon-textfield"
                label="メールアドレス"
                onChange={(e) => changeEmailText(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className={classes.margin}
                id="input-with-icon-textfield"
                label="パスワード"
                type="password"
                onChange={(e) => changePasswordText(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
            </form>
            <Button
              variant="contained"
              className={classes.margin}
              onClick={() => confirmSubmit()}
            >
              ログイン
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
