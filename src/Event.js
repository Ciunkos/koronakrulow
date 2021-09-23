import React, { memo } from "react";

const Event = ({ event, skipEvent }) => (
  <div className="modal-container" key={event.title}>
    <div className="event">
      <div className="event-title">{event.title}</div>
      {event.image && (
        <div className="well">
          <img
            className="layer"
            height={event.imageHeight ?? 720}
            loading="eager"
            src={event.image}
            width={event.imageWidth ?? 1280}
          />
        </div>
      )}
      {event.video && (
        <div className="well">
          <video
            autoPlay
            className="video-player layer"
            height={event.imageHeight ?? 720}
            loading="eager"
            playsInline
            preload="auto"
            src={event.video}
            width={event.imageWidth ?? 1280}
          />
        </div>
      )}
      <p>{event.logEntry}</p>
      {event.content}
      <button onClick={skipEvent}>Dalej</button>
    </div>
  </div>
);

export default memo(Event);
