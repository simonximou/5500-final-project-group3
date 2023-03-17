import "./usersList.css";
import { fetchAllUsers } from "../../apiCalls";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { DeleteForever } from "@material-ui/icons";
import axios from "axios";

export default function UsersList() {
  const user = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetchAllUsers();
      setUserData(res);
    };
    fetchUsers();
  }, [user]);

  const deleteHandler = (id) => {
    try {
      axios.delete("/users/" + id);
      window.location.reload();
    } catch (err) {}
  };

  const changeHandler = async (event) => {
    const username = event.target.value;
    let free = false;
    let vip = false;
    let admin = false;
    if (event.target.id === "free") {
      free = true;
    }
    if (event.target.id === "vip") {
      vip = true;
    }
    if (event.target.id === "admin") {
      admin = true;
    }
    const res = await axios.get(`/users?username=${username}`);
    const userInfo = {
      ...res.data,
      isFree: free,
      isVip: vip,
      isAdmin: admin,
    };
    try {
      await axios.put(`/users/${userInfo._id}`, userInfo);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="users">
      <div className="usersWrapper">
        <table className="table">
          <tr>
            <th className="th td">Username</th>
            <th className="th td">Email</th>
            <th className="th td">User Identity</th>
            <th className="th td">Delete</th>
          </tr>
          {userData.map((row) => (
            <tr>
              <td className="td">{row.username}</td>
              <td className="td">{row.email}</td>
              <td className="td">
                <input
                  type="radio"
                  id="free"
                  name={`user_role_${row.username}`}
                  value={row.username}
                  checked={row.isFree}
                  onChange={changeHandler}
                />
                <label htmlFor="free">Free User</label>
                <input
                  type="radio"
                  id="vip"
                  name={`user_role_${row.username}`}
                  value={row.username}
                  checked={row.isVip}
                  onChange={changeHandler}
                />
                <label htmlFor="vip">VIP User</label>
                <input
                  type="radio"
                  id="admin"
                  name={`user_role_${row.username}`}
                  value={row.username}
                  checked={row.isAdmin}
                  onChange={changeHandler}
                />
                <label htmlFor="admin">Administer</label>
              </td>
              <td className="td">
                <DeleteForever
                  fontSize="large"
                  onClick={() => deleteHandler(row._id)}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
