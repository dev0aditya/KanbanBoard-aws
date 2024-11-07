import React, { useState } from "react";

function HeaderInput({ setTasks }) {
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { ...formData, status: "todo", id: Date.now() },
      ]);
      setFormData({ title: "", description: "" });
    }
  };

  return (
    <form
      className=" py-6 px-6 xl:px-10 xl:flex xl:flex-col xl:items-end"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full h-full text-xl focus:outline-none px-2 py-1 text-[#d0d1d3] mb-[0.10rem] xl:text-2xl bg-[#383c41] xl:px-4 "
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full h-full text-xl focus:outline-none px-2 py-1 text-[#d0d1d3] xl:text-2xl bg-[#383c41] xl:px-4 xl:py-1"
      />
      <button
        type="submit"
        className="px-2 w-full py-1 bg-[#2E8B57] h-full flex justify-center items-center text-xl mt-2 xl:w-fit xl:px-6"
      >
        Add Todo
      </button>
    </form>
  );
}

export default HeaderInput;
