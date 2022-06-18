import React from "react";
import { useAppSelector, useAppDispatch } from "../App/store/store";
import { activeTodos, clearCompleted } from "../App/slice/data";
import { setCurrentTodo, currentTodo } from "../App/slice/data";

type Props = {};

const Footer = (props: Props) => {
  const dispatch = useAppDispatch();
  const Current = useAppSelector(currentTodo);
  const Active = useAppSelector(activeTodos);
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
    <section className='Footer'>
      <div className='Footer_items'>{Active.length} items left</div>
      <div>
        <div className='Footer_filter'>
          <button
            className={`${
              Current === "all" && "text-brightBlue dark:text-brightBlue"
            }`}
            onClick={() => setCurrentTodos("all")}>
            All
          </button>
          <button
            className={`${
              Current === "active" && "text-brightBlue dark:text-brightBlue"
            }`}
            onClick={() => setCurrentTodos("active")}>
            Active
          </button>
          <button
            className={`${
              Current === "completed" && "text-brightBlue dark:text-brightBlue"
            }`}
            onClick={() => setCurrentTodos("completed")}>
            Completed
          </button>
        </div>
      </div>
      <button className='Footer_btn' onClick={() => dispatch(clearCompleted())}>
        Clear completed
      </button>
    </section>
  );
};

export default Footer;
