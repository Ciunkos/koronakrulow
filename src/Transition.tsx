import React, { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const translateY = (isUp: boolean) => {
  return "translateY(" + (isUp ? "-" : "") + "60%) translateZ(0)";
};

interface TransitionProps {
  animateEntrance?: boolean;
  goingUp: boolean;
  out?: boolean;
  value: string;
}

const Transition = ({
  animateEntrance,
  goingUp,
  out,
  value,
}: TransitionProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [_in, setIn] = useState(() => (out ? true : !animateEntrance));

  const animate = () => {
    // Force element reflow to ensure correct animation in FF.
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    ref.current?.offsetWidth;

    setIn(true);
  };

  useEffect(() => {
    const timeout = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(timeout);
  }, []);

  const getTransform = () => {
    if (out) {
      return translateY(goingUp);
    }

    if (!_in) {
      return translateY(!goingUp);
    }

    // This has better text rendering in FF than simply `none`.
    return "translateY(0) translateZ(0)";
  };

  const isHidden = () => out || !_in;

  const getStyle = (): CSSProperties => {
    const transform = getTransform();

    return {
      display: "inline-block",

      // Can't dynamically change `position` from `absolute` to `static` -
      // it will break transition animation in Safari.
      position: "absolute",
      left: 0,

      WebkitTransition: "-webkit-transform 0.2s, opacity 0.2s",
      transition: "transform 0.2s, opacity 0.2s",

      WebkitTransform: transform,
      transform: transform,

      opacity: isHidden() ? 0 : 1,

      pointerEvents: "none",
    };
  };

  const style = getStyle();

  return (
    <span ref={ref} style={style}>
      {value}
    </span>
  );
};

export default Transition;
