import React, { memo } from "react";
import type { GameAction } from "./types.ts";

interface ActionProps {
  actionLogo: string;
  actions: GameAction[];
  performAction: (action: GameAction) => void;
  skipAction: () => void;
}

const Action = ({
  actionLogo,
  actions,
  performAction,
  skipAction,
}: ActionProps) => (
  <div className="modal-container">
    <div className="action">
      <div className="well">
        <img
          alt=""
          src={actionLogo}
          width={1280}
          height={360}
          loading="eager"
        />
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
