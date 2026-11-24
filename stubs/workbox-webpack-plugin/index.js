"use strict";

// Stand-in for workbox-webpack-plugin 6. react-scripts 5 requires this module
// at the top of config/webpack.config.js but only calls
// `new InjectManifest(...)` when src/service-worker.js exists. This project
// has no service worker (src/index.js calls unregister()), so the plugin
// never runs. Adding a service worker needs the real package back.
class Unavailable {
  constructor() {
    throw new Error(
      "workbox-webpack-plugin is stubbed in this project (see README.md, Overrides); remove the override to add a service worker"
    );
  }
}

class InjectManifest extends Unavailable {}
class GenerateSW extends Unavailable {}

module.exports = { InjectManifest, GenerateSW };
