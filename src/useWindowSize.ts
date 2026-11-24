import { useEffect, useState } from "react";

const useWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  const [size, setSize] = useState([innerWidth, innerHeight]);

  useEffect(() => {
    const onResize = () => {
      const { innerWidth, innerHeight } = window;

      setSize([innerWidth, innerHeight]);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return size;
};

export default useWindowSize;
