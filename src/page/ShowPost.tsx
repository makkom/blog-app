import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  selectPosts,
  deletePost,
  fetchPosts,
  createComment,
  fetchComments,
  selectComments,
} from "../redux_tool/postSlice";
import { confirmAuth } from "../redux_tool/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import marked from "marked";
import "./DisplayPost.css";
import "./ShowPost.css";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      borderRadius: 3,
      padding: theme.spacing(2, 4, 3),
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    },
    margin: {
      margin: 0,
    },
    deleteButton: {
      border: "none",
      cursor: "pointer",
      outline: "none",
      appearance: "none",
      backgroundColor: "#383838",
      color: "white",
      padding: "6px 15px",
      borderRadius: 3,
    },
    submitButton: {
      border: "none",
      cursor: "pointer",
      outline: "none",
      appearance: "none",
      backgroundColor: "#383838",
      color: "white",
      padding: "9px 25px",
      borderRadius: 3,
      fontWeight: "bold",
      minWidth: 60,
      marginLeft: 65,
      whiteSpace: "nowrap",
    },
    commentText: {
      width: 750,
    },
  })
);

const ShowPost: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const posts = useSelector(selectPosts);
  const comments = useSelector(selectComments);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let inputComment = "";

  const commentChange = (e) => {
    inputComment = e.target.value;
  };

  let id = window.location.pathname.split("/post")[1];
  if (id !== "") {
    id = id.split("/")[1];
  }
  let post = posts.find((p) => p.id === id);

  const dispatch = useDispatch();
  const loginInfo = useSelector(confirmAuth);
  const history = useHistory();

  const handleDelete = async (id: string) => {
    await deletePost(id);
    history.push("/");
  };

  useEffect(() => {
    const getData = () => {
      dispatch(fetchPosts());
    };
    getData();
  }, []);

  useEffect(() => {
    const getCommentsData = () => {
      dispatch(fetchComments(id));
    };
    getCommentsData();
  }, []);

  const submitData = async () => {
    const day = new Date();
    const timestamp = day.toLocaleDateString();

    const comment = {
      sentence: inputComment,
      createdAt: timestamp,
    };

    await createComment(id, comment.sentence, comment.createdAt);

    let form: any = document.getElementById("outlined-search");

    form.value = "";

    const getCommentsData = () => {
      dispatch(fetchComments(id));
    };
    getCommentsData();
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
      <button onClick={scrollHandle} id="scroll-to-top-btn" style={{}}>
        <p className="scroll-title">↑</p>
      </button>
      <div className="main-wrap">
        <Header />
        {loginInfo.auth ? (
          <Link to={`/post/edit/${id}`}>
            <button className="edit-post-btn">編集する</button>
          </Link>
        ) : null}
        {loginInfo.auth ? (
          <button className="eliminate-post-btn" onClick={handleOpen}>
            削除する
          </button>
        ) : null}
        <div className="post-wrapper">
          <div className="post-title">{`${post?.title}`}</div>
          <div className="post-info-wrap">
            <div className="post-info">{`投稿日 ${post?.createdAt}`}</div>
            <div className="post-info">
              {post?.updatedAt ? `更新日 ${post?.updatedAt}` : ""}
            </div>
            <div className="post-info">{`コメント件数 ${comments?.length}`}</div>
          </div>
          <div id="body">
            <span
              dangerouslySetInnerHTML={
                post?.body
                  ? { __html: marked(post?.body) }
                  : { __html: marked("") }
              }
            />
          </div>
          <div className="comment-wrap">
            <div className="comment">コメント</div>
            {comments.map((comment) => (
              <div className="comment-item">
                <p className="comment-contents">
                  {" "}
                  <span
                    dangerouslySetInnerHTML={
                      post?.body
                        ? { __html: marked(comment?.sentence) }
                        : { __html: marked("") }
                    }
                  />
                </p>
                <p className="comment-date">{comment.createdAt}</p>
              </div>
            ))}
            <div className="comment-input">
              <TextField
                id="outlined-search"
                type="search"
                variant="outlined"
                label="コメントを追加する"
                multiline
                rows={2}
                required={true}
                className={classes.commentText}
                onChange={(e) => commentChange(e)}
              />
              <button
                className={classes.submitButton}
                onClick={() => submitData()}
              >
                投 稿
              </button>
            </div>
          </div>
        </div>

        <Footer />

        {/* 以下モーダル設定 */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title" className={classes.margin}>
                確認
              </h2>
              <p id="transition-modal-description">
                本当にこの記事を削除しますか？
              </p>
              <button
                className={classes.deleteButton}
                onClick={() => handleDelete(id)}
              >
                削除する
              </button>
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default ShowPost;
