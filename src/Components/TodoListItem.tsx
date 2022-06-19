import React from "react";
import checkIcon from "../images/icon-check.svg";
import { useAppDispatch, useAppSelector } from "../App/store/store";
import {
  ToogleCompleted,
  removeTodo,
  justCreated,
  currentTodo,
} from "../App/slice/data";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useDrag, useDrop } from "react-dnd";
type Props = {
  id: string;
  content: string;
  completed: boolean;
  justCreated: boolean;
  moveCard: (id: string, atIndex: number) => void;
  findCard: (id: string) => any;
};

interface Item {
  id: string;
  originalIndex: number;
}

const TodoListItem = ({
  content,
  completed,
  id,
  justCreated,
  findCard,
  moveCard,
}: Props) => {
  const dispatch = useAppDispatch();
  const controller = useAnimation();
  const Current = useAppSelector(currentTodo);
  const originalIndex = findCard(id).index;
  const [, drag] = useDrag(
    () => ({
      type: "todo",
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging() ? true : false,
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "todo",
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );

  const makeTodoCompleted = () => {
    dispatch(ToogleCompleted(id));
  };
  const removeTodoItem = () => {
    dispatch(removeTodo(id));
    controller.set("deleted");
  };

  const SlideOut = {
    exit: {
      x: 500,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      ref={(node) => drag(drop(node))}
      variants={SlideOut}
      exit={Current === "all" ? "exit" : "dont"}
      className={`${
        justCreated ? "animate-slideInLeft duration-200" : "dont"
      } TodoListItem group`}>
      <div className='TodoListItem_wrapper'>
        <div
          onClick={() => {
            makeTodoCompleted();
          }}
          className={`${
            completed ? "TodoListItem_completed" : "TodoListItem_uncompleted"
          }`}>
          {completed && <img src={checkIcon} alt='check' />}
        </div>
        <p
          className={` ${
            completed
              ? "TodoListItem_content_completed"
              : "TodoListItem_content_uncompleted"
          }`}>
          {content}
        </p>
      </div>
      <button
        onClick={() => removeTodoItem()}
        className='TodoListItem_delete group-hover:block'>
        x
      </button>
    </motion.div>
  );
};

export default TodoListItem;
