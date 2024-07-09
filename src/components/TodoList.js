"use client";
import React, { useContext, useEffect, useState } from "react";
import ListItem from "./ListItem";
import { ListContext } from "@/context/listProvider";
const TodoList = () => {
  const [selected, setSelected] = useState("all");
  const { state, initialize } = useContext(ListContext);
  useEffect(() => {
    initialize();
  }, []);
  const handleFilter = (e) => {
    const { value } = e.target;
    console.log(value);
    setSelected(value);
    initialize(value);
  };

  return (
    <>
      <section className="mt-3">
        <label> Show </label>
        <select value={selected} onChange={handleFilter}>
          <option value="all">all</option>
          <option value="completed">completed</option>
          <option value="uncompleted">uncompleted</option>
        </select>
        <label> tasks</label>
        <header className="flex justify-center bg-slate-300 gap-3 p-2 mt-2 font-bold">
          <div className="w-[20%]">name</div>
          <div className="w-[20%]">description</div>
          <div className="w-[20%] text-center">completed</div>
          <div className="w-[20%] text-center">edit</div>
          <div className="w-[20%] text-center">delete</div>
        </header>
        {state.map((item) => (
          <ListItem key={item.id} {...item} />
        ))}
      </section>
    </>
  );
};

export default TodoList;
