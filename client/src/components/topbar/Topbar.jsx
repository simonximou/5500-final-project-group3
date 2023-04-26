import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ZodiacHolic</span>
        </Link>
      </div>
      <div className="topbarRight">
        <label>
          {user != null ? (
            <span>
              Welcome {user.username}
              <Link to={`/profile/`}>
                <img
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="topbarImg"
                  style={{ marginLeft: "10px" }}
                />{" "}
              </Link>
            </span>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span style={{ color: "white" }}>Please Login</span>
            </Link>
          )}
        </label>
      </div>
    </div>
  );
}
