"use client";

import { createContext, useReducer, useState } from "react";
const url = "https://wayi.league-funny.com/api/task";
const reducer = (state, action) => {
  if (action.type === "INITIALIZE") {
    return [...action.payload];
  }
  if (action.type === "FILTER") {
    return state.filter((item) => item.is_completed === action.payload);
  }
  if (action.type === "POST") {
    return [...state, action.payload];
  }
  if (action.type === "UPDATE" || "PATCH") {
    const oldState = state.filter((item) => item.id !== action.payload.id);
    return [...oldState, action.payload];
  }
  if (action.type === "DELETE") {
    const newState = state.filter((item) => item.id !== action.payload);
    return newState;
  }
  return state;
};

export const ListContext = createContext();
export const ListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    is_completed: "",
    updated_at: "",
    created_at: "",
  });
  const initialize = async (option) => {
    const allListData = [];
    const responseOks = [];
    const response = await fetch(`${url}?page=1&type=${option}`);
    const resData = await response.json();
    console.log(resData);
    const pageNumber =
      resData.total % 10
        ? Math.floor(resData.total / 10 + 1)
        : Math.floor(resData.total / 10);
    allListData.push(...resData.data);
    if (response.ok) responseOks.push(true);
    for (let page = 2; page <= pageNumber; page++) {
      const response = await fetch(`${url}?page=${page}`);
      const resData = await response.json();
      allListData.push(...resData.data);
      if (response.ok) responseOks.push(true);
    }
    console.log(responseOks, pageNumber);
    //dispatch
    if (!responseOks.includes(false)) {
      dispatch({ type: "INITIALIZE", payload: allListData });
    }
  };
  const deleteItem = async (id) => {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    //dispatch
    if (response.ok) {
      dispatch({ type: "DELETE", payload: id });
    }
  };
  const postItem = async (newFormData) => {
    try {
      const response = await fetch(url, {
        body: JSON.stringify(newFormData),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });
      const resData = await response.json();
      //dispatch
      if (response.ok) {
        dispatch({ type: "POST", payload: resData.data });
      }
    } catch (err) {
      console.error(err);
    }
  };
  const updateItem = async (newFormData) => {
    try {
      const response = await fetch(`${url}/${newFormData.id}`, {
        body: JSON.stringify(newFormData),
        headers: {
          "content-type": "application/json",
        },
        method: "PUT",
      });
      const resData = await response.json();
      //dispatch
      if (response.ok) {
        dispatch({ type: "UPDATE", payload: resData.data });
      }
    } catch (err) {
      console.error(err);
    }
  };
  const patchItem = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        headers: {
          "content-type": "application/json",
        },
        method: "PATCH",
      });
      const resData = await response.json();
      //dispatch
      if (response.ok) {
        console.log(resData);
        dispatch({ type: "PATCH", payload: resData.data });
      }
    } catch (err) {
      console.error(err);
    }
  };
  const filterItem = (is_completed) => {
    dispatch({ type: "FILTER", payload: is_completed });
  };
  const providerValue = {
    state,
    postItem,
    deleteItem,
    initialize,
    updateItem,
    patchItem,
    filterItem,
    isEditing,
    setIsEditing,
    formData,
    setFormData,
  };
  return (
    <ListContext.Provider value={providerValue}>
      {children}
    </ListContext.Provider>
  );
};
