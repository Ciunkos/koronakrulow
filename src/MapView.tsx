import React, { memo } from "react";

import map from "./map.svg";

interface MapViewProps {
  width: number;
  height: number;
}

const MapView = ({ width, height }: MapViewProps) => (
  <div className="map" style={{ width, height }}>
    <img className="map-image" src={map} alt="" />
  </div>
);

export default memo(MapView);
