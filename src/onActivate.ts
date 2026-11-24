import type { KeyboardEvent, SyntheticEvent } from "react";

// Keyboard twin of onClick for elements that act as buttons: Enter or Space
// runs the same handler.
const onActivate =
  <E extends Element>(handler: (event: SyntheticEvent<E>) => void) =>
  (event: KeyboardEvent<E>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handler(event);
    }
  };

export default onActivate;
