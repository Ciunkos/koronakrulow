import { useEffect, useState } from "react";

const useWindowSize = (): [width: number, height: number] => {
  const { innerWidth, innerHeight } = window;
  const [size, setSize] = useState<[number, number]>([innerWidth, innerHeight]);

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
