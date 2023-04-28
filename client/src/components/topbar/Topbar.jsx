import "./topbar.css";
import {Link, useHistory} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const history = useHistory;
    const handleLogout = ()=>{
        dispatch({ type: "LOGOUT" })
        history.push(`/`);
    }
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
              <button className="btn btn-info align-middle" style={{marginLeft: 2+'em'}}
                      onClick={() => handleLogout()}
              >Logout</button>
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
