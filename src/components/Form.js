"use client";
import { ListContext } from "@/context/listProvider";
import { useContext } from "react";
const Form = () => {
  const { postItem, isEditing,setIsEditing, formData, setFormData, updateItem } =
    useContext(ListContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const now = new Date();
      const nowIsoString = now.toISOString();
      const newFormData = {
        id:formData?.id,
        name: formData.name,
        description: formData.description,
        is_completed: formData?.is_completed,
        updated_at: nowIsoString,
      };
      if (isEditing) {
        await updateItem(newFormData);
        setIsEditing(false)
      } else {
        await postItem({ ...newFormData, created_at: nowIsoString });
      }
      setFormData({ name: "", description: "" });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="">
      <h2>{isEditing ? "Edit" : "Add new"} task</h2>
      <label htmlFor="name">name</label>
      <input
        className="m-1 p-2 bg-slate-100"
        id="name"
        name="name"
        value={formData?.name}
        onChange={handleOnChange}
        required
        maxLength={10}
      ></input>
      <label htmlFor="description">description</label>
      <input
        className="m-1 p-2 bg-slate-100"
        id="description"
        name="description"
        value={formData?.description}
        onChange={handleOnChange}
        maxLength={30}
      ></input>
      <button>Submit</button>
    </form>
  );
};

export default Form;
