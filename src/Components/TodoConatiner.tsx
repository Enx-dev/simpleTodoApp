import React, { useCallback, useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import update from "immutability-helper";
import FilterTodo from "./FilterTodo";
import TodoListItem from "./TodoListItem";
import lightIcon from "../images/icon-sun.svg";
import darkIcon from "../images/icon-moon.svg";
import { useAppSelector, useAppDispatch } from "../App/store/store";
import {
  allTodos,
  activeTodos,
  clearCompleted,
  currentTodo,
  completedTodos,
  todos,
  setTodos,
  justCreated,
} from "../App/slice/data";
import { setTheme, currentTheme } from "../App/slice/theme";
import Footer from "./Footer";
import { AnimatePresence, motion } from "framer-motion";
type Props = {};

const TodoConatiner = (props: Props) => {
  const dispatch = useAppDispatch();
  const currentTodos = useAppSelector(currentTodo);
  const allTodo = useAppSelector(allTodos);
  const activeTodo = useAppSelector(activeTodos);
  const completed = useAppSelector(completedTodos);
  const theme = useAppSelector(currentTheme);
  const Todos = useAppSelector(todos);
  const isJustCreated = useAppSelector(justCreated);
  const toogleTheme = (n: string) => {
    dispatch(setTheme(n));
  };

  useEffect(() => {
    switch (currentTodos) {
      case "all":
        dispatch(setTodos({ item: allTodo, name: "all" }));
        break;
      case "active":
        dispatch(setTodos({ item: activeTodo, name: "active" }));
        break;
      case "completed":
        dispatch(setTodos({ item: completed, name: "completed" }));
        break;
      default:
        dispatch(setTodos({ item: allTodo, name: "all" }));
    }
  }, [activeTodo, allTodo, currentTodos, completed, dispatch]);

  const findCard = useCallback(
    (id: string) => {
      const card = Todos?.filter((c: any) => `${c.id}` === id)[0] as {
        id: string;
        content: string;
        completed: boolean;
        justCreated: boolean;
        deleted: boolean;
      };
      return {
        card,
        index: Todos?.indexOf(card),
      };
    },
    [Todos]
  );
  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findCard(id);
      switch (currentTodos) {
        case "all":
          dispatch(
            setTodos({
              item: update(Todos, {
                $splice: [
                  [index, 1],
                  [atIndex, 0, card],
                ],
              }),
              name: "all",
            })
          );
          break;
        case "active":
          dispatch(
            setTodos({
              item: update(Todos, {
                $splice: [
                  [index, 1],
                  [atIndex, 0, card],
                ],
              }),
              name: "active",
            })
          );
          break;
        case "completed":
          dispatch(
            setTodos({
              item: update(Todos, {
                $splice: [
                  [index, 1],
                  [atIndex, 0, card],
                ],
              }),
              name: "completed",
            })
          );
          break;

        default:
          break;
      }
    },
    [findCard, Todos, dispatch, currentTodos]
  );

  return (
    <section className='TodoContainer'>
      <div className='TodoContainer_Header_div'>
        <h1 className='TodoContainer_Header_div_h1'>TODO</h1>
        {theme === "light" ? (
          <img onClick={() => toogleTheme("dark")} src={darkIcon} alt='dark' />
        ) : (
          <img
            onClick={() => toogleTheme("light")}
            src={lightIcon}
            alt='light'
          />
        )}
      </div>
      <CreateTodo />
      {Todos?.length !== 0 ? (
        <motion.section
          className='TodoContainer_List'
          transition={{
            staggerChildren: 0.2,
          }}>
          <AnimatePresence>
            {Todos?.map((todo) => {
              return (
                <TodoListItem
                  justCreated={todo.justCreated}
                  key={todo.id}
                  content={todo.content}
                  id={todo.id}
                  completed={todo.completed}
                  moveCard={moveCard}
                  findCard={findCard}
                />
              );
            })}
          </AnimatePresence>
          <div className='TodoContainer_completed'>
            <p>{activeTodo.length} items left</p>
            <button onClick={() => dispatch(clearCompleted())}>
              Clear completed
            </button>
          </div>
          <Footer />
        </motion.section>
      ) : (
        <div className='TodoContainer_initial'>
          {currentTodos === "completed"
            ? "Complete a Todo"
            : "Create Your First Todo"}
        </div>
      )}

      <FilterTodo />
      <footer className='TodoContainer_footer my-8'>
        Drag and drop to reorder list
      </footer>
    </section>
  );
};

export default TodoConatiner;
