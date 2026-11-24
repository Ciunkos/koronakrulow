import React, { memo } from "react";

import TvIcon from "./TvIcon.js";
import MusicIcon from "./MusicIcon.js";

const Controls = ({ audio, toggleMusic, toggleTvpis, tvpis }) => (
  <div className="controls">
    <button type="button" className="link" onClick={toggleTvpis}>
      <TvIcon /> {tvpis ? "Wyłącz" : "Włącz"} TVPiS
    </button>{" "}
    •{" "}
    <button type="button" className="link" onClick={toggleMusic}>
      <MusicIcon /> {audio ? "Wyłącz" : "Włącz"} muzykę
    </button>
  </div>
);

export default memo(Controls);
