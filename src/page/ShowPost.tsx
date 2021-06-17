import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { selectPosts, deletePost } from "../redux_tool/postSlice";
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
      padding: theme.spacing(2, 4, 3),
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    },
    margin: {
      margin: 0,
    },
    button: {
      border: "none",
      cursor: "pointer",
      outline: "none",
      appearance: "none",
      backgroundColor: "#383838",
      color: "white",
      padding: "6px 15px",
    },
  })
);

const ShowPost: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const posts = useSelector(selectPosts);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  return (
    <>
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
          <div className="post-info">{`いいねの数 ${post?.like}`}</div>
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
            <button className={classes.button} onClick={() => handleDelete(id)}>
              削除する
            </button>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default ShowPost;
