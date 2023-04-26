import Post from "./pages/post";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import Search from "./pages/search/search";
import SearchResult from "./pages/search/searchResult";
import EditProfile from "./pages/edit-profile";
import Home from "./pages/home";
import UserPost from "./pages/user-post";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import React from "react";
import { AuthContext } from "./context/AuthContext";
import Users from "./pages/users";
import Detail from "./pages/detail/detail";
import EmailVerify from "./pages/EmailVerify";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
    
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>

        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>

        <Route path="/search/:constellation">
          <SearchResult />
        </Route>

        <Route path="/search">
          {user ? <Search /> : <Redirect to="/login" />}
        </Route>

        <Route path="/detail/:constellation">
          <Detail />
        </Route>

        <Route path="/post">
           {user ? <Post /> : <Redirect to="/login" />}
        </Route>

        <Route path="/profile/:username/posts">
          <UserPost />
        </Route>

        <Route path="/profile/:username">
          <Profile />
        </Route>

        <Route path="/profile/">
          <Profile />
        </Route>

        <Route path="/edit-profile/">
          <EditProfile />
        </Route>

        <Route path="/admin">
          <Users />
        </Route>

        <Route path="/users/:id/verify/:token">
          <EmailVerify/>
        </Route>


      </Switch>
    </Router>
  );
}

export default App;
