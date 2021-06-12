import React, { useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import selectPosts from "../redux_tool/postSlice";
import { useSelector } from "react-redux";
import "./Login.css";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  margin: {
    marginTop: 30,
  },
});

const Login: React.FC = () => {
  const [input, setInput] = useState("");
  // const posts = useSelector(selectPosts);

  const classes = useStyles();

  const changeText = (e) => {
    setInput(e.target.value);
    console.log(input);
  };

  const confirmSubmit = () => {
    console.log(input);
  };

  return (
    <div>
      <Header />
      <div className="login_main">
        <div className="login-wrap">
          <div className="login_input-area">
            <p className="top-text">管理者認証画面</p>
            <form className="input-form" onChange={(e) => changeText(e)}>
              <TextField
                className="text"
                id="input-with-icon-textfield"
                label="メールアドレス"
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
              onClick={confirmSubmit}
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
