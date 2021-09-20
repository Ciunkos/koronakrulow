import React, { memo } from "react";

import TransitiveNumber from "./TransitiveNumber";
import formatNumber from "./formatNumber";
import AlertIcon from "./AlertIcon";

const GameControls = ({
  busy,
  daysToWin,
  deathrattleLeft,
  onShowActionClick,
  politics,
  stop,
  togglePlay,
  underControl,
}) => (
  <>
    <div className="action-buttons">
      <button disabled={busy} onClick={onShowActionClick}>
        Następny dzień
      </button>
      <button
        disabled={busy && stop}
        className="fast-forward-button"
        onClick={togglePlay}
        title={busy ? "Zatrzymaj" : "Rozpocznij"}
      >
        {busy ? (
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        ) : (
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="13 19 22 12 13 5 13 19"></polygon>
            <polygon points="2 19 11 12 2 5 2 19"></polygon>
          </svg>
        )}
      </button>
    </div>
    {busy && <div className="busy-status">Postęp pandemii...</div>}
    {underControl && (
      <div className="alert positive">
        <AlertIcon />{" "}
        <span>
          Dni do opanowania epidemii:{" "}
          <TransitiveNumber>{formatNumber(daysToWin)}</TransitiveNumber>
        </span>
      </div>
    )}
    {politics === 0 && (
      <div className="alert">
        <AlertIcon />{" "}
        <span>
          Dni do rozwiązania rządu:{" "}
          <TransitiveNumber>{formatNumber(deathrattleLeft)}</TransitiveNumber>
        </span>
      </div>
    )}
  </>
);

export default memo(GameControls);
