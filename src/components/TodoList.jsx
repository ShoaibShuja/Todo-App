import React, { useState, useEffect } from "react";
import { FaRegCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import Filters from "./Filters";
import Heading from "./Heading";
import Footer from "./Footer";
import { GoX } from "react-icons/go";

const TodoList = ({ lightMode, setLightMode }) => {
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("todoList");
    return savedTodoList ? JSON.parse(savedTodoList) : [];
  });
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("draggedItemIndex", index);
  };

  const handleDrop = (e, dropIndex) => {
    const draggedItemIndex = e.dataTransfer.getData("draggedItemIndex");
    if (draggedItemIndex === dropIndex) return;

    const updatedTodoList = [...todoList];
    const [draggedItem] = updatedTodoList.splice(draggedItemIndex, 1);
    updatedTodoList.splice(dropIndex, 0, draggedItem);

    setTodoList(updatedTodoList);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (index) => {
    const updatedTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedTodoList);
  };

  const toggleTodoCompletion = (index) => {
    const updatedTodoList = todoList.map((todo, i) => {
      if (i === index) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  };

  const clearCompletedItems = () => {
    const updatedTodoList = todoList.filter((todo) => !todo.isCompleted);
    setTodoList(updatedTodoList);
  };

  const filteredTodoList = todoList.filter((todo) => {
    if (filter === "Active") return !todo.isCompleted;
    if (filter === "Completed") return todo.isCompleted;
    return true;
  });

  return (
    <div className="scale-z-100">
      <Heading
        addTodo={addTodo}
        lightMode={lightMode}
        setLightMode={setLightMode}
      />
      <div
        className={`shadow-lg mx-8 mt-7 sm:max-w-[34rem] sm:mx-auto rounded-bl-lg rounded-br-lg ${
          lightMode ? "bg-white" : "bg-[#25273D]"
        }`}
      >
        {filteredTodoList.map((todo, index) => (
          <div
            key={index}
            className={`border-b relative group ${
              lightMode ? "border-gray-200" : "border-gray-700"
            } ${index === 0 ? "rounded-t-lg" : ""}`} // Make the first todo item rounded at the top
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
          >
            <button
              className={`${
                lightMode ? "bg-white" : "bg-[#25273c]"
              } w-full text-md px-7 py-[1.1rem] flex justify-start items-center gap-4`}
            >
              {todo.isCompleted ? (
                <FaCircleCheck
                  fontSize={29}
                  color="purple"
                  onClick={() => toggleTodoCompletion(index)}
                  className="cursor-pointer max-sm:text-lg"
                />
              ) : (
                <FaRegCircle
                  fontSize={29}
                  color="gray"
                  onClick={() => toggleTodoCompletion(index)}
                  className="cursor-pointer max-sm:text-lg"
                />
              )}
              <p
                className={`max-sm:text-sm text-[19px] max-sm:text-[16px] ${
                  !lightMode
                    ? todo.isCompleted
                      ? "text-[#4d5067] line-through"
                      : "text-[#c8cbe7]"
                    : todo.isCompleted
                    ? "text-[#d1d2da] line-through"
                    : "text-[#494c6b]"
                }
                }`}
              >
                {todo.todo}
              </p>
            </button>
            <GoX
              fontSize={24}
              className="text-[#979797] absolute right-5 top-[50%] translate-y-[-50%] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
              onClick={() => removeTodo(index)}
            />
          </div>
        ))}

        <div
          className={`${
            lightMode ? "bg-white" : "bg-[#25273D]"
          } flex justify-between items-center px-6 py-4 rounded-bl-lg rounded-br-lg ${
            filteredTodoList.length === 0 ? "rounded-t-lg" : ""
          }`}
        >
          <p className="text-sm text-[#9495a5] hover:text-[#e3e4f1] cursor-default">
            {todoList.filter((todo) => !todo.isCompleted).length} items left
          </p>
          <Filters
            display={"max-sm:hidden flex"}
            setFilter={setFilter}
            lightMode={lightMode}
          />
          <button
            className="text-sm text-[#9495a5] hover:text-[#e3e4f1] cursor-pointer"
            onClick={clearCompletedItems}
          >
            Clear Completed
          </button>
        </div>
      </div>
      <Footer lightMode={lightMode} setFilter={setFilter} />
    </div>
  );
};

export default TodoList;
