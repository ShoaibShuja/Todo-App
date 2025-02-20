import React, { useEffect } from "react";
import Heading from "./components/Heading";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import bgImageMobileL from "./assets/bg-mobile-light.jpg";
import bgImageDesktopL from "./assets/bg-desktop-light.jpg";
import bgImageMobileD from "./assets/bg-mobile-dark.jpg";
import bgImageDesktopD from "./assets/bg-desktop-dark.jpg";

const App = () => {
  const [screenType, setScreenType] = React.useState("mobile");
  const [lightMode, setLightMode] = React.useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setScreenType("desktop");
      } else {
        setScreenType("mobile");
      }
    };

    window.addEventListener("resize", handleResize);

    // Call the function initially to set the correct screenType
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`relative ${
        lightMode ? "bg-[#f5f7ff]" : "bg-[#171823]"
      } min-h-screen`}
    >
      <img
        src={
          screenType === "mobile"
            ? lightMode
              ? bgImageMobileL
              : bgImageMobileD
            : lightMode
            ? bgImageDesktopL
            : bgImageDesktopD
        }
        className="absolute w-screen max-sm:max-h-[230px]"
      />
      <TodoList lightMode={lightMode} setLightMode={setLightMode} />
    </div>
  );
};

export default App;
