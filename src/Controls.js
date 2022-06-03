import React, { memo } from "react";

import TvIcon from "./TvIcon.js";
import MusicIcon from "./MusicIcon.js";

const Controls = ({ audio, toggleMusic, toggleTvpis, tvpis }) => (
  <div className="controls">
    <a href="#" onClick={toggleTvpis}>
      <TvIcon /> {tvpis ? "Wyłącz" : "Włącz"} TVPiS
    </a>{" "}
    •{" "}
    <a href="#" onClick={toggleMusic}>
      <MusicIcon /> {audio ? "Wyłącz" : "Włącz"} muzykę
    </a>
  </div>
);

export default memo(Controls);
