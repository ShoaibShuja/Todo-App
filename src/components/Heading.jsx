import React from "react";
import bgImage from "../assets/bg-mobile-light.jpg";
import { FaMoon, FaRegCircle } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

const Heading = ({ addTodo, lightMode, setLightMode }) => {
  const [newTodo, setNewTodo] = React.useState("");

  const handleThemeChange = () => {
    setLightMode((prev) => !prev);
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newTodo.trim()) {
      addTodo({
        todo: newTodo,
        isCompleted: false,
      });
      setNewTodo("");
    }
  };

  return (
    <div className="w-screen relative max-w-[34rem] mx-auto">
      <div className="max-sm:px-8 max-sm:py-10 pt-19 pb-10 flex justify-between items-center">
        <h2 className="text-white font-bold text-4xl tracking-[15px]">TODO</h2>
        {lightMode ? (
          <FaMoon
            fontSize={32}
            color="white"
            className="cursor-pointer"
            onClick={handleThemeChange}
          />
        ) : (
          <IoSunnyOutline
            fontSize={32}
            color="white"
            className="cursor-pointer"
            onClick={handleThemeChange}
          />
        )}
      </div>

      <div
        className={`rounded-lg shadow-lg max-sm:mx-8 max-sm:mt-2 ${
          lightMode ? "bg-white" : "bg-[#25273D]"
        }`}
      >
        <button className="bg-transparent w-full text-md px-8 py-4 rounded-lg flex justify-center items-center gap-4 cursor-pointer">
          <FaRegCircle fontSize={29} color="gray" className="max-sm:text-lg" />
          <input
            type="text"
            placeholder="Create a new todo..."
            className={`w-full bg-transparent text-[19px] max-sm:text-[16px] outline-none ${
              lightMode
                ? "text-[#494c6b] placeholder-[#759FCE] font-medium"
                : "text-[#c8cbe7] placeholder-[#4d5067] font-medium"
            }`}
            value={newTodo}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </button>
      </div>
    </div>
  );
};

export default Heading;
