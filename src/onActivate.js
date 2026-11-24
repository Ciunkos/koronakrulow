// Keyboard twin of onClick for elements that act as buttons: Enter or Space
// runs the same handler.
const onActivate = (handler) => (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handler(event);
  }
};

export default onActivate;
