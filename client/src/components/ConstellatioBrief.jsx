import { useEffect, useState } from "react";
import { constellationCall } from "../apiCalls";

export default function (constellation) {
  const [data, setData] = useState({});
  useEffect(() => {
    constellationCall(constellation.constellation).then((res) => {
      setData(res);
    });
    console.log(constellation);
    console.log(data);
  }, [constellation]);

  return (
    <>
      <div class="row">
        <h2>
          <a href={`/detail/${constellation.constellation}`}>
            {constellation.constellation}
          </a>
        </h2>
      </div>
      <div class="row">
        <span>{data.today}</span>
      </div>
      <br />
    </>
  );
}
