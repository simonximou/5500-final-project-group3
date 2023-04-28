import "bootstrap/dist/css/bootstrap.min.css";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Constellation from "../../components/constellation";
import { ConstellationArray } from "../../context/Constellation";
import "./search.css";
import { useParams } from "react-router-dom";
import Feed from "../../components/feed/Feed";
import { useEffect } from "react";
import { constellationCall } from "../../apiCalls";
import ConstellatioBrief from "../../components/ConstellatioBrief";

export default function SearchResult() {
  const input = useParams().constellation.toLowerCase(); // get the path parameter from the route
  const result = [];
  
  // Filters the constellation based on the input
  ConstellationArray.forEach((e) => {
    if (e.includes(input)) {
      result.push(e);
    }
  });

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div className="topbarCenter">
          <div className="container" style={{ padding: "15px", width: "80%" }}>
            {result.length == 0
              ? "No result found"
              : result.map((e) => <ConstellatioBrief constellation={e} />)}
          </div>
        </div>
      </div>
    </>
  );
}
