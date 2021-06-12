import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";
import CustomPaginationActionsTable from "./components/Table/Table";
import DisplayPost from "./page/DisplayPost";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "./redux_tool/postSlice";
import { Link } from "react-router-dom";
// import { fetchPosts } from "./redux_tool/postSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectPosts);
  // useEffect(() => {
  //   dispatch(fetchPosts());
  // });

  return (
    <>
      <Header />
      <Link to="/newpost">
        <button className="new-post-btn">新規投稿</button>
      </Link>
      <div className="main">
        <div className="item-wrapper">
          <div className="each_item_title">
            <div className="article-title">タイトル</div>
            <div className="date-title">作成日時</div>
            <div className="favorite-title">いいね数</div>
          </div>
          <CustomPaginationActionsTable />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
