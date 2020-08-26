import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";
import "../../index.css";

function Home() {
  const [content, setContent] = useState("");
  return (
    <>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </>
  );
}

export default Home;
