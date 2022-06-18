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
} from "../App/slice/data";
import { setTheme, currentTheme } from "../App/slice/theme";
import Footer from "./Footer";
type Props = {};

const TodoConatiner = (props: Props) => {
  const dispatch = useAppDispatch();
  const currentTodos = useAppSelector(currentTodo);
  const allTodo = useAppSelector(allTodos);
  const activeTodo = useAppSelector(activeTodos);
  const completed = useAppSelector(completedTodos);
  const theme = useAppSelector(currentTheme);
  const Todos = useAppSelector(todos);

  const toogleTheme = (n: string) => {
    dispatch(setTheme(n));
  };

  useEffect(() => {
    switch (currentTodos) {
      case "all":
        dispatch(setTodos(allTodo));
        break;
      case "active":
        dispatch(setTodos(activeTodo));
        break;
      case "completed":
        dispatch(setTodos(completed));
        break;
      default:
        dispatch(setTodos(allTodo));
    }
  }, [activeTodo, allTodo, currentTodos, completed, dispatch]);

  const findCard = useCallback(
    (id: string) => {
      const card = Todos?.filter((c: any) => `${c.id}` === id)[0] as {
        id: string;
        content: string;
        completed: boolean;
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
      // const newCards = todos?.splice(index!, 0, card);
      // console.log(newCards);
      dispatch(
        setTodos(
          update(Todos, {
            $splice: [
              [index, 1],
              [atIndex, 0, card],
            ],
          })
        )
      );
    },
    [findCard, Todos, dispatch]
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
      {todos?.length !== 0 ? (
        <section className='TodoContainer_List'>
          {Todos?.map((todo) => {
            return (
              <TodoListItem
                key={todo.id}
                content={todo.content}
                id={todo.id}
                completed={todo.completed}
                moveCard={moveCard}
                findCard={findCard}
              />
            );
          })}

          <div className='TodoContainer_completed'>
            <p>{activeTodo.length} items left</p>
            <button onClick={() => dispatch(clearCompleted())}>
              Clear completed
            </button>
          </div>
          <Footer />
        </section>
      ) : (
        <div className='TodoContainer_initial'>Create Your First Todo</div>
      )}

      <FilterTodo />
      <footer className='TodoContainer_footer my-8'>
        Drag and drop to reorder list
      </footer>
    </section>
  );
};

export default TodoConatiner;
