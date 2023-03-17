import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import { ConstellationArray } from "../../context/Constellation";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./search.css";
import { useEffect, useRef, useState } from "react";

export default function Search() {
  const history = useHistory();
  const items = [];

  function handleOnSelect(item) {
    history.push("/search/" + item.name);
  }
  ConstellationArray.forEach((e) => {
    items.push({ name: e });
  });

  useEffect(() => {
    const keyDownHandler = (event) => {
      console.log("User pressed: ", event.key);
      if (event.key === "Enter") {
        event.preventDefault();
        console.log(document.getElementsByTagName("input")[0].value);
        history.push(
          "/search/" + document.getElementsByTagName("input")[0].value
        );
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div className="topbarCenter">
          <div
            className="container"
            id="searchBox"
            style={{ padding: "15px", width: "80%" }}
          >
            <ReactSearchAutocomplete
              items={items}
              onSelect={handleOnSelect}
              styling={{ zIndex: 1 }}
              autoFocus
            />
          </div>
        </div>
      </div>
    </>
  );
}
