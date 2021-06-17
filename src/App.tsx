import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";
import CustomPaginationActionsTable from "./components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, fetchPosts } from "./redux_tool/postSlice";
import { userAuth } from "./redux_tool/userSlice";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { auth } from "./firebase";
import FirstFade from "./page/FirstFade";
import { checkRead } from "./redux_tool/viewSlice";
import { alreadyRead } from "./redux_tool/viewSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const history = useHistory();
  const readCheck = useSelector(alreadyRead);

  const [confirmLogin, setConfirmLogin] = useState(false);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      dispatch(userAuth(false));
      setConfirmLogin(false);
      history.push("/login");
    } catch (err) {
      alert("ログアウトに失敗しました。");
    }
  };

  useEffect(() => {
    const getData = () => {
      dispatch(fetchPosts());
    };
    getData();
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(userAuth(true));
        setConfirmLogin(true);
      }
    });
  }, []);

  const changeRead = () => {
    dispatch(checkRead(true));
  };

  return (
    <div onClick={changeRead}>
      {readCheck.alreadyRead ? null : <FirstFade />}
      <Header />
      {confirmLogin ? (
        <Link to="/newpost">
          <button className="new-post-btn">新規投稿</button>
        </Link>
      ) : null}
      {confirmLogin ? (
        <button className="logout-btn" onClick={handleSignOut}>
          LOGOUT
        </button>
      ) : null}
      <div className="main">
        <div className="item-wrapper">
          <div className="each_item_title">
            <div className="article-title">タイトル</div>
            <div className="date-title">作成日時</div>
            <div className="favorite-title">いいね数</div>
          </div>
          <div className="each_item">
            <CustomPaginationActionsTable />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
