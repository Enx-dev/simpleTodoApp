import React from "react";
import { currentTheme } from "../App/slice/theme";
import { useAppSelector } from "../App/store/store";
type Props = {};

const Header = (props: Props) => {
  const theme = useAppSelector(currentTheme);
  return (
    <section
      className={`Header ${
        theme === "dark"
          ? "bg-heroImgDarkMobile md:bg-heroImgDarkDeskTop"
          : "bg-heroImgLightMobile md:bg-heroImgLightDeskTop"
      }`}></section>
  );
};

export default Header;
