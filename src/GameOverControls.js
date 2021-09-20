import React, { memo } from "react";

import AlertIcon from "./AlertIcon";

const GameOverControls = ({ onBackClick, win }) => (
  <>
    <button onClick={onBackClick}>Wróć do menu głównego</button>
    {win ? (
      <div className="alert positive">
        <AlertIcon /> <span>Epidemia opanowana</span>
      </div>
    ) : (
      <div className="alert">
        <AlertIcon /> <span>Rząd rozwiązany</span>
      </div>
    )}
  </>
);

export default memo(GameOverControls);
