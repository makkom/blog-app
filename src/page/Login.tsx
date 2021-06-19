import React from "react";
import { useForm } from "react-hook-form";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import { selectPosts } from "../redux_tool/postSlice";
import { useSelector, useDispatch } from "react-redux";
import "./Login.css";
import Header from "../components/Header/Header";
import { makeStyles } from "@material-ui/styles";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  marginWidth: {
    backgroundColor: "#383838",
    color: "white",
    height: 50,
    width: 140,
    fontWeight: "bold",
    marginTop: 30,
    "&:hover": {
      backgroundColor: "#6b6a6a",
    },
  },
  marginWidthExtend: {
    marginTop: 30,
    width: "100%",
  },
});

interface AuthDataTypes {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthDataTypes>();

  const posts = useSelector(selectPosts);

  const handleSignIn = async (data: AuthDataTypes) => {
    const { email, password } = data;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch {
      alert("エラーが発生しました。");
    }
  };

  return (
    <div>
      <Header />
      <div className="login_main">
        <div className="login-wrap">
          <div className="login_input-area">
            <p className="top-text">管理者認証画面</p>
            <form className="input-form" onSubmit={handleSubmit(handleSignIn)}>
              <TextField
                className="text"
                id="input-with-icon-textfield"
                label="メールアドレス"
                autoFocus
                error={Boolean(errors.email)}
                helperText={errors.email && errors.email.message}
                {...register("email", {
                  required: "メールアドレスを正しい形式で入力してください",
                  pattern:
                    /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className={classes.marginWidthExtend}
                id="input-with-icon-textfield"
                label="パスワード"
                type="password"
                error={Boolean(errors.password)}
                helperText={errors.password && errors.password.message}
                {...register("password", {
                  required: "パスワードを正しい形式で入力してください",
                  minLength: 6,
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                className={classes.marginWidth}
                onClick={handleSubmit(handleSignIn)}
              >
                LOGIN
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
