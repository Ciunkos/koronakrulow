"use strict";

// Stand-in for @svgr/plugin-svgo 5. react-scripts 5 configures @svgr/webpack
// with `svgo: false` (config/webpack.config.js), and the real plugin starts
// with `if (!config.svgo) return code;`. This keeps that behaviour and fails
// loudly if anything ever asks for SVGO, instead of silently skipping it.
function svgoPlugin(code, config) {
  if (config && config.svgo) {
    throw new Error(
      "@svgr/plugin-svgo is stubbed in this project (see README.md, Overrides); svgo: true is not supported"
    );
  }
  return code;
}

exports.__esModule = true;
exports.default = svgoPlugin;
