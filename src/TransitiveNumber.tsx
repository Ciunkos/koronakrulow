import React, { memo } from "react";
import type { ComponentPropsWithoutRef } from "react";

import Symbol from "./Symbol.tsx";

interface TransitiveNumberProps extends ComponentPropsWithoutRef<"span"> {
  children: number | string;
  enableInitialAnimation?: boolean;
}

const TransitiveNumber = ({
  children,
  enableInitialAnimation = false,
  ...rest
}: TransitiveNumberProps) => {
  const value = children.toString();

  // Invert animation direction when negative number is supplied.
  const inverted = value[0] === "-";

  return (
    <span {...rest}>
      {value.split("").map((symbol, index) => (
        <Symbol
          key={index}
          symbol={symbol}
          inverted={inverted}
          enableInitialAnimation={enableInitialAnimation}
        />
      ))}
    </span>
  );
};

export default memo(TransitiveNumber);
