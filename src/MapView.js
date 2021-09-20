import React, { memo } from "react";
import Map from "pigeon-maps";

function mapTilerProvider(x, y, z, dpr) {
  const s = String.fromCharCode(97 + ((x + y + z) % 3));
  return `https://${s}.basemaps.cartocdn.com/dark_nolabels/${z}/${x}/${y}${
    dpr >= 2 ? "@2x" : ""
  }.png`;
}

const MapView = ({ width, height }) => (
  <div className="map">
    <Map
      provider={mapTilerProvider}
      dprs={[1, 2]}
      center={[52.06, 19.25]}
      zoom={6.5}
      width={width}
      height={height}
    />
  </div>
);

export default memo(MapView);
