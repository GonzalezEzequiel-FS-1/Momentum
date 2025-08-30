import { useState, useEffect } from "react";

export const useMobileLandscape = () => {
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  const checkOrientation = () => {
    const isMobile = window.innerWidth <= 768; // breakpoint for mobile
    const isLandscape = window.innerWidth > window.innerHeight;
    setIsMobileLandscape(isMobile && isLandscape);
  };

  useEffect(() => {
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  return isMobileLandscape;
};
