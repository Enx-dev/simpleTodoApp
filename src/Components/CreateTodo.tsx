import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "../App/store/store";
import { v4 as uuid } from "uuid";
import { addTodo } from "../App/slice/data";

type Props = {};

const CreateTodo = (props: Props) => {
  const [todo, setTodo] = useState({
    id: uuid(),
    content: "",
    completed: false,
  });
  const dispatch = useAppDispatch();
  const createTodoRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    createTodoRef.current?.focus();
  }, [todo]);

  const onSubmit = () => {
    dispatch(addTodo(todo));
    setTodo({
      completed: false,
      content: "",
      id: uuid(),
    });
    if (createTodoRef.current) {
      createTodoRef.current.value = "";
    }
  };
  return (
    <div className='CreateTodo'>
      <div className='CreateTodo_checkbox'></div>
      <input
        ref={createTodoRef}
        className='CreateTodo_input'
        type='text'
        placeholder='Create a new todo..'
        onChange={(e) => setTodo({ ...todo, content: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit();
        }}
      />
    </div>
  );
};

export default CreateTodo;
