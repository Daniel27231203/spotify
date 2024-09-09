import React, { FC, ReactNode } from "react";
import scss from "./Layout.module.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import PlayList from "./PlayList/PlayList";

interface LayoutSiteProps {
  children: ReactNode;
}

const LayoutSite: FC<LayoutSiteProps> = ({ children }) => {
  return (
    <div className={scss.LayoutSite}>
      <Header />
      <div className={scss.Home}>
        <PlayList />
        <main>{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default LayoutSite;
