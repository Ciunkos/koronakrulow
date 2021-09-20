import React, { memo } from "react";

const Action = ({ actionLogo, actions, performAction, skipAction }) => (
  <div className="modal-container">
    <div className="action">
      <div className="well">
        <img src={actionLogo} width={1280} height={360} loading="eager" />
      </div>
      <div className="action-title">Podejmij decyzję</div>
      <div className="actions">
        {actions.map((action, index) => (
          <button
            key={action.title + index}
            onClick={() => performAction(action)}
          >
            {action.title}
          </button>
        ))}
        <button onClick={skipAction}>Nie rób nic</button>
      </div>
    </div>
  </div>
);

export default memo(Action);
