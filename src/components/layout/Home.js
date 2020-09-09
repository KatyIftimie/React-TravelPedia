import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";
import "../../index.css";

function Home() {
  const [content, setContent] = useState("");

  useEffect(() => {
    document.body.className = "overflow-hidden";
  }, []);

  return (
    <>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </>
  );
}

export default Home;
