import "bootstrap/dist/css/bootstrap.min.css";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Constellation from "../../components/constellation";
import { ConstellationArray } from "../../context/Constellation";
import { useParams } from "react-router-dom";
import Feed from "../../components/feed/Feed";

export default function Detail() {
  const constellation = useParams().constellation.toLowerCase();
  // If the constellation entered on the path route is invalid,
  // Signals the user that "No results found"
  if (!ConstellationArray.includes(constellation)) {
    return (
      <>
        <Topbar />
        <div className="homeContainer">
          <Sidebar />
          <div className="topbarCenter">
            <div id="constellation">No results found</div>
          </div>
        </div>
      </>
    );
  }
  
  // If the constellation is valid, renders the daily horoscope in <Constellation/>,
  // and renders the posts by others with the same constellation in <Feed/> component 
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div className="topbarCenter">
          <div id="constellation">
            <Constellation constellation={constellation} />
          </div>
          <Feed constellation={constellation} post="false" />
        </div>
      </div>
    </>
  );
}
