import React, { memo } from "react";

import Symbol from "./Symbol";

const TransitiveNumber = ({
  children,
  enableInitialAnimation = false,
  ...rest
}) => {
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
