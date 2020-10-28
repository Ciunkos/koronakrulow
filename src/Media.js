import { classNames } from "@sandstreamdev/std/web";
import React, { memo } from "react";

import headlineImage from "./headline.jpg";
import headlineVideo from "./headline.mp4";
import formatNumber from "./formatNumber";

const Media = ({
  latestQueuedState,
  mediaCover,
  newCases,
  newDeaths,
  newRecovered,
  skipMedia,
  skipVideo,
  tvpis,
  videoPlayer,
}) => (
  <div className="modal-container">
    <div className="media">
      <div className="media-cover">
        <img
          className={classNames("video-background layer", {
            active: !mediaCover,
          })}
          height={720}
          src={tvpis ? headlineImage : latestQueuedState.propagandaImage}
          width={1280}
          loading="eager"
        />
        {tvpis && (
          <video
            autoPlay={tvpis}
            className={classNames("video-player layer", {
              active: !mediaCover,
            })}
            height={720}
            poster={tvpis ? headlineImage : latestQueuedState.propagandaImage}
            preload="auto"
            ref={videoPlayer}
            src={headlineVideo}
            width={1280}
          ></video>
        )}
        {tvpis && (
          <div className="strip layer">
            <div className="strip-content">
              PANDEMIA KORONAWIRUSA • Nowe przypadki {formatNumber(newCases)} •
              Zgony dziś {formatNumber(newDeaths)} • Wyzdrowiali dziś{" "}
              {formatNumber(newRecovered)}
            </div>
          </div>
        )}
        {tvpis && (
          <div className="strip-primary layer">
            <div className="strip-animated">{latestQueuedState?.message}</div>
          </div>
        )}
        <img
          className={classNames("cover-image layer", { active: mediaCover })}
          height={573}
          onClick={skipVideo}
          src={latestQueuedState.propagandaImage}
          title="Pomiń"
          width={1020}
          loading="eager"
        />
        {mediaCover && (
          <div className="actions" onClick={skipMedia}>
            <button onClick={skipMedia}>Dalej</button>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default memo(Media);
