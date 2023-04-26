import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import UsersList from "../../components/users/UsersList";
import "./home.css";

export default function Users() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <UsersList />
      </div>
    </>
  );
}
