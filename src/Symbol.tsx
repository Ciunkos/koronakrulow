import React, { memo, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import Transition from "./Transition.tsx";

const isDecrementing = (a: string | undefined, b: string) => {
  const numberA = Number(a);
  const numberB = Number(b);

  // Special case when going from 9 or 6 to 0 (and back).
  if (Math.abs(numberB - numberA) !== 1) {
    return numberA === 0;
  } else {
    return numberB < numberA;
  }
};

const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

interface SymbolProps {
  enableInitialAnimation: boolean;
  inverted: boolean;
  symbol: string;
}

const Symbol = ({ enableInitialAnimation, inverted, symbol }: SymbolProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  const [previous, setPrevious] = useState<string | null>(null);
  const [decrementing, setDecrementing] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  const removePrevious = () => {
    setPrevious(null);
  };

  useEffect(() => {
    const target = ref.current;

    if (!target) {
      return;
    }

    target.addEventListener("transitionend", removePrevious);

    return () => target.removeEventListener("transitionend", removePrevious);
  }, []);

  const previousSymbol = usePrevious(symbol);
  const previousInverted = usePrevious(inverted);

  useEffect(() => {
    if (previousSymbol !== symbol) {
      const decrementing = isDecrementing(previousSymbol, symbol);

      setPrevious(previousSymbol ?? null);
      setDecrementing(previousInverted ? !decrementing : decrementing);

      if (initialRender) {
        setInitialRender(false);
      }
    }
  }, [previousSymbol, symbol, initialRender, previousInverted]);

  const style: CSSProperties = {
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
      {/* Disabled: the outgoing symbol is not animated. */}
      {/* oxlint-disable-next-line no-constant-binary-expression -- kept switched off on purpose */}
      {false && previous !== null && (
        <Transition
          value={previous ?? ""}
          goingUp={decrementing}
          out
          key={previous}
        />
      )}
    </span>
  );
};

export default memo(Symbol);
