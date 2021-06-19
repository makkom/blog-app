import React, { useEffect, useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import marked from "marked";
import "./DisplayPost.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createPost } from "../redux_tool/postSlice";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: 0,
        width: "90ch",
        marginTop: 30,
      },
    },
    button: {
      backgroundColor: "#383838",
      color: "white",
      height: 50,
      width: 170,
      fontWeight: "bold",
      marginLeft: "auto",
    },
  })
);

const DisplayPost: React.FC = () => {
  const [markdown, setMarkdown] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      !user && history.push("/");
    });
  }, []);

  const titleChange = (e) => {
    setInputTitle(e.target.value);
  };

  const submitData = async () => {
    const day = new Date();
    const timestamp = day.toLocaleDateString();
    const post = {
      createdAt: timestamp.toLocaleString(),
      title: inputTitle,
      body: markdown,
    };
    await createPost(post.createdAt, post.title, post.body);
    history.push("/");
  };

  //ボタン
  const scroll_to_top_btn: any = document.querySelector("#scroll-to-top-btn");

  function scroll_to_top() {
    window.scroll({ top: 0, behavior: "smooth" });
  }

  const scrollHandle = () => {
    scroll_to_top();
  };

  return (
    <>
      <Header />
      <button onClick={scrollHandle} id="scroll-to-top-btn" style={{}}>
        <p className="scroll-title">↑</p>
      </button>
      <div className="post-main">
        <div className="markdown-wrapper">
          <div className="title">新規投稿</div>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onChange={(e) => titleChange(e)}
          >
            <TextField
              id="outlined-basic"
              label="タイトル"
              variant="outlined"
              required={true}
            />
          </form>
          <div className="input-area">
            <SimpleMDE onChange={(e) => setMarkdown(e)} />
          </div>
          <div className="trace-title">出力画面</div>
          <div id="body" className="trace-area">
            <span dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
          </div>
          <div className="button-wrapper">
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => submitData()}
            >
              投稿する
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default DisplayPost;
