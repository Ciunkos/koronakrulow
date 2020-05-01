import React, { memo, useEffect, useRef, useState } from "react";

import Transition from "./Transition";

const isDecrementing = (a, b) => {
  const numberA = Number(a);
  const numberB = Number(b);

  // Special case when going from 9 or 6 to 0 (and back).
  if (Math.abs(numberB - numberA) !== 1) {
    return numberA === 0;
  } else {
    return numberB < numberA;
  }
};

const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

const Symbol = ({ enableInitialAnimation, inverted, symbol }) => {
  const ref = useRef();

  const [previous, setPrevious] = useState(null);
  const [decrementing, setDecrementing] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  const removePrevious = () => {
    setPrevious(null);
  };

  useEffect(() => {
    const target = ref.current;

    target.addEventListener("transitionend", removePrevious);

    return () => target.removeEventListener("transitionend", removePrevious);
  }, []);

  const previousSymbol = usePrevious(symbol);
  const previousInverted = usePrevious(inverted);

  useEffect(() => {
    if (previousSymbol !== symbol) {
      const decrementing = isDecrementing(previousSymbol, symbol);

      setPrevious(previousSymbol);
      setDecrementing(previousInverted ? !decrementing : decrementing);

      if (initialRender) {
        setInitialRender(false);
      }
    }
  }, [previousSymbol, symbol, initialRender, previousInverted]);

  const style = {
    position: "relative",
    display: "inline-block",
  };

  return (
    <span ref={ref} style={style}>
      <span
        style={{
          visibility: "hidden",
        }}
      >
        {symbol}
      </span>
      <Transition
        value={symbol}
        goingUp={decrementing}
        animateEntrance={initialRender ? enableInitialAnimation : true}
        key={symbol}
      />
      {false && previous !== null && (
        <Transition
          value={previous}
          goingUp={decrementing}
          out
          key={previous}
        />
      )}
    </span>
  );
};

export default memo(Symbol);
