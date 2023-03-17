import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Constellation from "../../components/constellation";
import { ConstellationArray } from "../../context/Constellation";

export default function Home() {
  const randomElement = ConstellationArray[Math.floor(Math.random() * 12)];

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Constellation constellation={randomElement} />
      </div>
    </>
  );
}
