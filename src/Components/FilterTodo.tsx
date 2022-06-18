import React from "react";
import { useAppDispatch, useAppSelector } from "../App/store/store";
import { setCurrentTodo, currentTodo } from "../App/slice/data";

type Props = {};

const FilterTodo = (props: Props) => {
  const dispatch = useAppDispatch();
  const Current = useAppSelector(currentTodo);
  const setCurrentTodos = (todos: any) => {
    switch (todos) {
      case "all":
        dispatch(setCurrentTodo("all"));
        break;
      case "active":
        dispatch(setCurrentTodo("active"));
        break;
      case "completed":
        dispatch(setCurrentTodo("completed"));
    }
  };

  return (
    <div className='FilterTodo'>
      <button
        className={`${
          Current === "all" &&
          "text-brightBlue dark:text-brightBlue hover:!text-brightBlue"
        }`}
        onClick={() => setCurrentTodos("all")}>
        All
      </button>
      <button
        className={`${
          Current === "active" &&
          "text-brightBlue dark:text-brightBlue hover:!text-brightBlue"
        }`}
        onClick={() => setCurrentTodos("active")}>
        Active
      </button>
      <button
        className={`${
          Current === "completed" &&
          "text-brightBlue dark:text-brightBlue hover:!text-brightBlue"
        }`}
        onClick={() => setCurrentTodos("completed")}>
        Completed
      </button>
    </div>
  );
};

export default FilterTodo;
