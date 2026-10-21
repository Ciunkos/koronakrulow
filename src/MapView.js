import React, { memo } from "react";
import Map from "pigeon-maps";

function esriDarkGrayProvider(x, y, z) {
  return `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/${z}/${y}/${x}`;
}

const attribution = (
  <span>
    Tiles &copy;{" "}
    <a href="https://www.esri.com/" target="_blank" rel="noopener noreferrer">
      Esri
    </a>{" "}
    &mdash; Esri, DeLorme, NAVTEQ
  </span>
);

const MapView = ({ width, height }) => (
  <div className="map">
    <Map
      provider={esriDarkGrayProvider}
      attribution={attribution}
      center={[52.06, 19.25]}
      zoom={6.5}
      width={width}
      height={height}
    />
  </div>
);

export default memo(MapView);
