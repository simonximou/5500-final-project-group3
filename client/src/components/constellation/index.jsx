import "bootstrap/dist/css/bootstrap.min.css";
import { constellationCall } from "../../apiCalls";
import { useState, useEffect } from "react";
const PF = process.env.REACT_APP_PUBLIC_FOLDER; // env variable that specifies the public folder that contains static assest

export default function ConstellationInfo({ constellation }) {
  const [data, setData] = useState({});

  useEffect(() => {
    // fetch yesterday's and today's horoscope from aztro public api
    // by calling util emthod constellationCall
    if (!constellation) {
      return <></>;
    }
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
            alt="Constellation"
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
