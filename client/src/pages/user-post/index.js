import Topbar from "../../components/topbar/Topbar";
import "./user-post.css";
import Post from "../../components/post/Post";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function UserPost() {
  const [posts, setPosts] = useState([]);
  const username = useParams().username;
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/profile/" + username);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username]);
  return (
    <>
      <Topbar />
      <div className="feedWrapper">
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </>
  );
}
