import { useState, useEffect } from "react";

export const useWindowWidth = (size) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [width])
  // console.log(width);
  return width > size
}
