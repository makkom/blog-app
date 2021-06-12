import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import marked from "marked";
import "./DisplayPost.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../redux_tool/postSlice";
import { Post } from "../types";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";

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
  const dispatch = useDispatch();

  const titleChange = (e) => {
    setInputTitle(e.target.value);
  };

  const submitData = () => {
    const timestamp = Date.now();
    const post: Post = {
      createdAt: timestamp.toLocaleString(),
      title: inputTitle,
      body: markdown,
      like: 0,
    };
    dispatch(createPost(post));
  };

  return (
    <>
      <Header />
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
            <Link to="/">
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => submitData()}
              >
                投稿する
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default DisplayPost;
