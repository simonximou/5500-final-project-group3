
import "bootstrap/dist/css/bootstrap.min.css";
import { constellationCall } from "../../apiCalls";
import { useState, useEffect } from "react";
import pic from "../constellation/1181682636155_.pic.jpg"
const PF = process.env.REACT_APP_PUBLIC_FOLDER; // env variable that specifies the public folder that contains static assest

export default function ({ constellation }) {
  if (!constellation) {
    return <></>;
  }
  const [data, setData] = useState({});
  
  useEffect(() => {
    // fetch yesterday's and today's horoscope from aztro public api
    // by calling util emthod constellationCall
    constellationCall(constellation).then((res) => {
      setData(res);
    });
  }, [constellation]);

  return (
    <div
      className="container"
      style={{paddingLeft: "15px", paddingRight: "30px", paddingTop: "10px" }}
    >

      <div class="row">
        <div class="col-6">
          <h1>Daily horoscopes art for {constellation}</h1>
        </div>
        <div className="col-6">
          <h1>Join our community today!</h1>
        </div>
      </div>
      <div class="row"
           style={{paddingBottom: "50px" }}>
        <div class="col-sm">
          <img
            src={`${PF}constellation/${constellation}.jpeg`}
            style={{ width: "400px", height: "300px" }}
          />
        </div>

        <div class="col-sm">
          <img
              src={pic}
              style={{width: 300, height:300, borderRadius: 400/ 2}}
          />
          <div class="row">{data.yesterday}</div>
        </div>
      </div>
      <div className="row">
        <img
            src={'https://thumbs.dreamstime.com/b/magical-banner-astrology-celestial-alchemy-heavenly-art-zodiac-tarot-device-universe-crescent-moon-196472869.jpg'}
        />
      </div>
    </div>
  );
}

}
