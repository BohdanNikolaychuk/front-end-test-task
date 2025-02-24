import "preline/preline";
import { IStaticMethods } from "preline/preline";
import React, { useEffect } from "react";
import { useLocation } from "react-router";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

type Props = {
  children: React.ReactNode;
};

const UIProvider = ({ children }: Props) => {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return children;
};

export default UIProvider;
