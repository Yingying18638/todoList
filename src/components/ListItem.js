"use client";
import React, { useContext } from "react";
import { ListContext } from "@/context/listProvider";

const ListItem = ({ id, name, description, is_completed }) => {
  const { deleteItem, setIsEditing, patchItem, setFormData, state } =
    useContext(ListContext);
  const handleEdit = () => {
    setIsEditing(true);
    const listToEdit = state.find((item) => item.id === id);
    setFormData(listToEdit);
  };
  return (
    <div className="flex justify-center items-center p-1 gap-3" >
      <div className="w-[20%]">{name}</div>
      <div className="w-[20%]">{description}</div>
      <input
        className="w-[20%] h-5"
        type="checkbox"
        checked={is_completed}
        onChange={()=>patchItem(id)}
      ></input>
      <button className="w-[20%]" onClick={handleEdit}>
        edit me
      </button>
      <button className="w-[20%]" onClick={() => deleteItem(id)}>
        delete me
      </button>
    </div>
  );
};

export default ListItem;
