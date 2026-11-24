// The game used to ship a Create React App service worker. Unregister any
// that an earlier visit installed, so returning players get fresh files.
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
