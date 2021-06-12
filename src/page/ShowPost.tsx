import React from "react";
import {
  selectPosts,
  getPickUpPost,
  deletePost,
} from "../redux_tool/postSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import marked from "marked";
import "./DisplayPost.css";
import "./ShowPost.css";
import { Link } from "react-router-dom";

const ShowPost: React.FC = () => {
  // const post = useSelector(getPickUpPost);
  const posts = useSelector(selectPosts);

  let id = window.location.pathname.split("/post")[1];
  if (id !== "") {
    id = id.split("/")[1];
  }

  let post = posts[id];

  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <Link to={`/post/edit/${id}`}>
        <button className="edit-post-btn">編集する</button>
      </Link>
      <Link to="/">
        <button
          className="eliminate-post-btn"
          onClick={() => dispatch(deletePost(post))}
        >
          削除する
        </button>
      </Link>
      <div className="post-wrapper">
        <div className="post-title">{`${post.title}`}</div>
        <div className="post-info-wrap">
          <div className="post-info">{`投稿日 ${post.createdAt}`}</div>
          <div className="post-info">
            {post.updatedAt ? `更新日 ${post.updatedAt}` : ""}
          </div>
          <div className="post-info">{`いいねの数 ${post.like}`}</div>
        </div>
        <div id="body">
          <span dangerouslySetInnerHTML={{ __html: marked(post.body) }} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShowPost;
