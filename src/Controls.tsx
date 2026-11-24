import React, { memo } from "react";

import TvIcon from "./TvIcon.tsx";
import MusicIcon from "./MusicIcon.tsx";

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
