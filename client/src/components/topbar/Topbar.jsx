import "./topbar.css";
import { Person, Chat, Notifications } from "@material-ui/icons";
import {Link, useHistory} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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
                <Link to={`/profile/`} style={{color:'white'}}>
              Welcome {user.username}

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
