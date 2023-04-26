import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

// The Feed component is shared by two other components.
// If Feed is rendered in 'Post page', then it only renders the posts posted by current user
// If Feed is rendered in Detail component, then is renders the posts posted by the current user and other users
// who have the same constellation as the current user.
export default function Feed({ username, constellation = "", post = true }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext); // user is the current loggedin user

  useEffect(() => {
    const fetchPosts = async () => {
      if (constellation !== "") {
        // If the constellation is not empty, it means we are at Search page
        // We fetch all the posts from users who have the same constellation as the current user.
        const res = await axios.get("/posts/" + constellation);
        setPosts(res.data);
      } else {
        // If the constellation if empty, it means we are at the Post page (note: Post page is a place we render the posts of the current user)
        // We fetch all the posts of the current user from the backend api
        const res = username
          ? await axios.get("/posts/profile/" + username)
          : await axios.get("/posts/timeline/" + user._id);
        setPosts(
          res.data.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
          })
        );
      }
    };
    fetchPosts();
  }, [constellation, username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/*If we are post page, we render a <Share /> component, which allows the user to add a post*/}
        {(!username || username === user.username) && post === true && (
          <Share />
        )}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
