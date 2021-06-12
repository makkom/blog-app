import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import marked from "marked";
import "./DisplayPost.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { createPost, selectPosts, editPost } from "../redux_tool/postSlice";
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

const EditPost: React.FC = () => {
  const posts = useSelector(selectPosts);

  let id = window.location.pathname.split("/post/edit")[1];
  if (id !== "") {
    id = id.split("/")[1];
  }

  let post = posts[id];

  const [markdown, setMarkdown] = useState(`${post.body}`);
  const [inputTitle, setInputTitle] = useState(`${post.title}`);
  const classes = useStyles();
  const dispatch = useDispatch();

  const titleChange = (e) => {
    setInputTitle(e.target.value);
  };

  const submitData = () => {
    const updatePost: Post = {
      id: post.id,
      title: inputTitle,
      body: markdown,
    };
    dispatch(editPost(updatePost));
  };

  return (
    <>
      <Header />
      <div className="post-main">
        <div className="markdown-wrapper">
          <div className="title">記事を編集する</div>
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
              value={inputTitle}
            />
          </form>
          <div className="input-area">
            <SimpleMDE onChange={(e) => setMarkdown(e)} value={markdown} />
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
                編集する
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default EditPost;
