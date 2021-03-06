import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import DisplayPost from "./page/DisplayPost";
import EditPost from "./page/EditPost";
import Login from "./page/Login";
import ShowPost from "./page/ShowPost";
import { useSelector } from "react-redux";
import confirmAuth from "./redux_tool/userSlice";

const Routing = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/newpost">
          <DisplayPost />
        </Route>
        <Route exact path="/post/:id">
          <ShowPost />
        </Route>
        <Route exact path="/post/edit/:id">
          <EditPost />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routing;
