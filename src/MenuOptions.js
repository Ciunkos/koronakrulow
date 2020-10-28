import React, { memo } from "react";

const MenuOptions = ({
  custom,
  onCustomPlayClick,
  onPlayClick,
  onSecondWavePlayClick,
  secondWaveEnabled,
}) => (
  <div className="options">
    {secondWaveEnabled && (
      <div>
        <button onClick={onSecondWavePlayClick}>Rozpocznij drugą falę</button>
        <div className="hint">
          Na front walk z koronawirusem wkraczają zbuntowani obywatele. Wojna
          polsko-polska!
        </div>
      </div>
    )}
    <div>
      <button onClick={onPlayClick}>
        {secondWaveEnabled ? "Rozegraj pierwszą falę" : "Graj"}
      </button>
      <div className="hint">
        Rozpocznij walkę z koronawirusem i sprawdź się w zarządzaniu państwem w
        czasie pandemii
      </div>
    </div>
    <div>
      <button disabled={!custom} onClick={onCustomPlayClick}>
        Gra dowolna
      </button>
      <div className="hint">
        Gra dowolna pozwala wybierać akcje z wszystkich dostępnych opcji
      </div>
      {!custom && (
        <div className="requirement">
          {secondWaveEnabled
            ? "Opanuj epidemię w trybie klasycznym lub w drugiej fali aby odblokować"
            : "Opanuj epidemię w trybie klasycznym aby odblokować"}
        </div>
      )}
    </div>
  </div>
);

export default memo(MenuOptions);
