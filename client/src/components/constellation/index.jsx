import "bootstrap/dist/css/bootstrap.min.css";
import { constellationCall } from "../../apiCalls";
import { useState, useEffect } from "react";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function ({ constellation }) {
  if (!constellation) {
    return <></>;
  }
  const [data, setData] = useState({});
  useEffect(() => {
    constellationCall(constellation).then((res) => {
      setData(res);
    });
  }, [constellation]);

  return (
    <div
      className="container"
      style={{ paddingLeft: "30px", paddingRight: "30px", paddingTop: "10px" }}
    >
      <div class="row">
        <h1>Daily horoscopes for {constellation}</h1>
      </div>
      <div class="row">
        <div class="col-sm">
          <img
            src={`${PF}constellation/${constellation}.jpeg`}
            style={{ width: "400px", height: "300px" }}
          />
        </div>

        <div class="col-sm" style={{ padding: "30px" }}>
          <div class="row" id="today">
            {data.today}
          </div>
          <div class="row">{data.yesterday}</div>
        </div>
      </div>
    </div>
  );
}
