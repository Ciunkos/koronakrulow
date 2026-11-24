import React, { memo } from "react";

import map from "./map.svg";

const MapView = ({ width, height }) => (
  <div className="map" style={{ width, height }}>
    <img className="map-image" src={map} alt="" />
  </div>
);

export default memo(MapView);
