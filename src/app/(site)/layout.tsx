import LayoutSite from "@/components/layout/LayoutSite";
import React, { FC, ReactNode } from "react";

interface LaoyoutProps {
  children: ReactNode;
}

const layout: FC<LaoyoutProps> = ({ children }) => {
  return <LayoutSite>{children}</LayoutSite>;
};

export default layout;
