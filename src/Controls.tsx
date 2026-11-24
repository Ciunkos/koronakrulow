import React, { memo } from "react";

import TvIcon from "./TvIcon.tsx";
import MusicIcon from "./MusicIcon.tsx";
import type { MouseEvent } from "react";

interface ControlsProps {
  audio: boolean;
  toggleMusic: (event: MouseEvent) => void;
  toggleTvpis: (event: MouseEvent) => void;
  tvpis: boolean;
}

const Controls = ({
  audio,
  toggleMusic,
  toggleTvpis,
  tvpis,
}: ControlsProps) => (
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
