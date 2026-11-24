import React, { memo } from "react";

interface ProgressProps {
  actions: Record<string, unknown>;
  events: Record<string, unknown>;
  games: number;
  lost: number;
  randomPropaganda: Record<string, unknown>;
  unlockedActions: string[];
  unlockedEvents: string[];
  unlockedStripes: string[];
  won: number;
}

const Progress = ({
  actions,
  events,
  games,
  lost,
  randomPropaganda,
  unlockedActions,
  unlockedEvents,
  unlockedStripes,
  won,
}: ProgressProps) => (
  <section>
    <h3>Twój postęp</h3>
    <div className="progress-list">
      <div className="progress-box">
        <div className="progress-title">Opanowane epidemie</div>
        <div className="progress-value">{won}</div>
      </div>
      <div className="progress-box">
        <div className="progress-title">Rozwiązanie rządy</div>
        <div className="progress-value">{lost}</div>
      </div>
      <div className="progress-box">
        <div className="progress-title">Rozgrywki</div>
        <div className="progress-value">{games}</div>
      </div>
      <div className="progress-box">
        <div className="progress-title">Odblokowane paski</div>
        <div className="progress-value">
          {unlockedStripes.length}/
          {Object.keys(randomPropaganda).length + Object.keys(actions).length}
        </div>
      </div>
      <div className="progress-box">
        <div className="progress-title">Odblokowane akcje</div>
        <div className="progress-value">
          {unlockedActions.length}/{Object.keys(actions).length}
        </div>
      </div>
      <div className="progress-box">
        <div className="progress-title">Odblokowane wydarzenia</div>
        <div className="progress-value">
          {unlockedEvents.length}/{Object.keys(events).length}
        </div>
      </div>
    </div>
  </section>
);

export default memo(Progress);
