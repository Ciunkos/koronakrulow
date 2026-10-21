// Generates src/map.svg, the static dark basemap of Poland shown behind the game.
//
// Input: Natural Earth 1:10m GeoJSON files (public domain) downloaded into one
// directory from
// https://github.com/nvkelso/natural-earth-vector/tree/master/geojson
//
//   ne_10m_land, ne_10m_lakes, ne_10m_lakes_europe,
//   ne_10m_rivers_lake_centerlines, ne_10m_rivers_europe,
//   ne_10m_admin_0_boundary_lines_land, ne_10m_admin_1_states_provinces_lines,
//   ne_10m_roads, ne_10m_urban_areas
//
// Usage: node map.js <directory with the .geojson files>
//
// The projection matches the previous tile map: Web Mercator at zoom 6.5,
// centered on Poland, so the SVG is drawn 1:1 in CSS pixels around its center.
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const CENTER = [19.25, 52.06];
const ZOOM = 6.5;
const WIDTH = 3000;
const HEIGHT = 2000;
const PAD = 40;
const TOLERANCE = 0.8;

const WORLD = 256 * 2 ** ZOOM;

const mercator = ([lon, lat]) => {
  const sin = Math.sin((lat * Math.PI) / 180);
  return [
    ((lon + 180) / 360) * WORLD,
    (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * WORLD,
  ];
};

const [cx, cy] = mercator(CENTER);
const project = (point) => {
  const [x, y] = mercator(point);
  return [x - cx + WIDTH / 2, y - cy + HEIGHT / 2];
};

const MIN_X = -PAD;
const MIN_Y = -PAD;
const MAX_X = WIDTH + PAD;
const MAX_Y = HEIGHT + PAD;

const inside = ([x, y]) => x >= MIN_X && x <= MAX_X && y >= MIN_Y && y <= MAX_Y;

// Sutherland-Hodgman against each edge of the padded frame.
const clipRing = (ring) => {
  const edges = [
    [(p) => p[0] >= MIN_X, (a, b) => lerpX(a, b, MIN_X)],
    [(p) => p[0] <= MAX_X, (a, b) => lerpX(a, b, MAX_X)],
    [(p) => p[1] >= MIN_Y, (a, b) => lerpY(a, b, MIN_Y)],
    [(p) => p[1] <= MAX_Y, (a, b) => lerpY(a, b, MAX_Y)],
  ];
  let output = ring;
  for (const [isIn, cut] of edges) {
    const input = output;
    output = [];
    for (let i = 0; i < input.length; i++) {
      const current = input[i];
      const previous = input[(i + input.length - 1) % input.length];
      if (isIn(current)) {
        if (!isIn(previous)) {
          output.push(cut(previous, current));
        }
        output.push(current);
      } else if (isIn(previous)) {
        output.push(cut(previous, current));
      }
    }
    if (output.length === 0) {
      break;
    }
  }
  return output;
};

const lerpX = ([x1, y1], [x2, y2], x) => [
  x,
  y1 + ((y2 - y1) * (x - x1)) / (x2 - x1),
];
const lerpY = ([x1, y1], [x2, y2], y) => [
  x1 + ((x2 - x1) * (y - y1)) / (y2 - y1),
  y,
];

// Splits a line into the runs that stay within the frame, keeping one point
// past each edge so strokes reach it.
const clipLine = (line) => {
  const runs = [];
  let run = [];
  line.forEach((point, i) => {
    const near =
      inside(point) ||
      (i > 0 && inside(line[i - 1])) ||
      (i < line.length - 1 && inside(line[i + 1]));
    if (near) {
      run.push(point);
    } else if (run.length > 0) {
      runs.push(run);
      run = [];
    }
  });
  if (run.length > 0) {
    runs.push(run);
  }
  return runs.filter((r) => r.length > 1);
};

const segmentDistance = ([x, y], [x1, y1], [x2, y2]) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = dx * dx + dy * dy;
  const t =
    length === 0
      ? 0
      : Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / length));
  return Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy));
};

const simplify = (points) => {
  if (points.length < 3) {
    return points;
  }
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length > 0) {
    const [first, last] = stack.pop();
    let max = 0;
    let index = 0;
    for (let i = first + 1; i < last; i++) {
      const distance = segmentDistance(points[i], points[first], points[last]);
      if (distance > max) {
        max = distance;
        index = i;
      }
    }
    if (max > TOLERANCE) {
      keep[index] = 1;
      stack.push([first, index], [index, last]);
    }
  }
  return points.filter((_, i) => keep[i]);
};

// Whole pixels as relative moves keep the file small; the map is drawn 1:1.
const toPath = (points, closed) => {
  let d = "";
  let last = null;
  points.forEach(([x, y]) => {
    const point = [Math.round(x), Math.round(y)];
    if (!last) {
      d += `M${point[0]} ${point[1]}`;
    } else {
      const dx = point[0] - last[0];
      const dy = point[1] - last[1];
      if (dx === 0 && dy === 0) {
        return;
      }
      d += `l${dx}${dy < 0 ? "" : " "}${dy}`;
    }
    last = point;
  });
  return closed ? `${d}z` : d;
};

const read = (directory, name) =>
  JSON.parse(readFileSync(join(directory, `${name}.geojson`), "utf8")).features;

const polygonsOf = (geometry) =>
  !geometry
    ? []
    : geometry.type === "Polygon"
    ? [geometry.coordinates]
    : geometry.type === "MultiPolygon"
    ? geometry.coordinates
    : [];

const linesOf = (geometry) =>
  !geometry
    ? []
    : geometry.type === "LineString"
    ? [geometry.coordinates]
    : geometry.type === "MultiLineString"
    ? geometry.coordinates
    : [];

const area = (points) => {
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    sum += x1 * y2 - x2 * y1;
  }
  return Math.abs(sum / 2);
};

const fills = (features, minArea = 0) =>
  features
    .flatMap((feature) => polygonsOf(feature.geometry))
    .flatMap((polygon) => polygon)
    .map((ring) => simplify(clipRing(ring.map(project))))
    .filter((ring) => ring.length > 2 && area(ring) >= minArea)
    .map((ring) => toPath(ring, true))
    .join("");

const strokes = (features) =>
  features
    .flatMap((feature) => linesOf(feature.geometry))
    .flatMap((line) => clipLine(line.map(project)))
    .map(simplify)
    .filter((line) => line.length > 1)
    .map((line) => toPath(line, false))
    .join("");

const main = (directory) => {
  const land = read(directory, "ne_10m_land");
  // Kept apart: the two sets overlap, which an even-odd fill would cancel out.
  const lakes = [
    read(directory, "ne_10m_lakes"),
    read(directory, "ne_10m_lakes_europe"),
  ];
  const rivers = [
    ...read(directory, "ne_10m_rivers_lake_centerlines"),
    ...read(directory, "ne_10m_rivers_europe"),
  ];
  const countries = read(directory, "ne_10m_admin_0_boundary_lines_land");
  const regions = read(directory, "ne_10m_admin_1_states_provinces_lines");
  const roads = read(directory, "ne_10m_roads").filter(
    (feature) =>
      feature.properties.continent === "Europe" &&
      feature.properties.featurecla === "Road"
  );
  const urban = read(directory, "ne_10m_urban_areas");

  const majorRoads = roads.filter(
    (feature) => feature.properties.type === "Major Highway"
  );
  const minorRoads = roads.filter(
    (feature) => feature.properties.type !== "Major Highway"
  );

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
<rect width="${WIDTH}" height="${HEIGHT}" fill="#393939"/>
<path fill="#0d0d0d" fill-rule="evenodd" d="${fills(land)}"/>
<path fill="#141414" d="${fills(urban, 40)}"/>
${lakes
  .map(
    (features) =>
      `<path fill="#393939" fill-rule="evenodd" d="${fills(features, 2)}"/>`
  )
  .join("\n")}
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="#262626" stroke-width="0.8" d="${strokes(rivers)}"/>
<path stroke="#1c1c1c" stroke-width="0.8" d="${strokes(minorRoads)}"/>
<path stroke="#242424" stroke-width="1.2" d="${strokes(majorRoads)}"/>
<path stroke="#2b2b2b" stroke-width="0.8" stroke-dasharray="2 3" d="${strokes(
    regions
  )}"/>
<path stroke="#3a3a3a" stroke-width="1.2" stroke-dasharray="6 3" d="${strokes(
    countries
  )}"/>
</g>
</svg>
`;

  writeFileSync("src/map.svg", svg);
  console.log(`src/map.svg: ${Math.round(svg.length / 1024)} KiB`);
};

main(process.argv[2]);
