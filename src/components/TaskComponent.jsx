import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TaskComponent({ task, tasks, setTasks, containerId }) {
  const { title, description, status, id } = task;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleDelete = () => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  };

  const handleStatusChange = (newStatus) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, status: newStatus } : t
    );
    setTasks(updatedTasks);
  };

  const handleEdit = () => {
    const newTitle = prompt("Edit Title", title);
    const newDescription = prompt("Edit Description", description);
    if (newTitle && newDescription) {
      const updatedTasks = tasks.map((t) =>
        t.id === id ? { ...t, title: newTitle, description: newDescription } : t
      );
      setTasks(updatedTasks);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative border-[1px] border-white border-opacity-30 px-4 py-2"
      data-sortable-id={containerId}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute top-0 right-0 cursor-grab p-2 text-lg"
        style={{ cursor: "grab" }}
      >
        ::
      </div>

      <h2 className="title font-bold tracking-wide text-xl xl:text-2xl">
        {title}
      </h2>
      <p className="opacity-80 mt-1 xl:text-xl">{description}</p>
      <div className="controls flex gap-3 pb-2 pt-4 justify-end">
        {status !== "todo" && (
          <button
            onClick={() =>
              handleStatusChange(status === "done" ? "in-progress" : "todo")
            }
            className="bg-[#2E8B57] py-1 px-2 xl:font-semibold xl:px-3 xl:tracking-wide"
          >
            Prev
          </button>
        )}
        <button
          onClick={handleEdit}
          className="bg-[#2E8B57] py-1 px-2 xl:font-semibold xl:px-3 xl:tracking-wide"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-[#2E8B57] py-1 px-2 xl:font-semibold xl:px-3 xl:tracking-wide"
        >
          Delete
        </button>
        {status !== "done" && (
          <button
            onClick={() =>
              handleStatusChange(status === "todo" ? "in-progress" : "done")
            }
            className="bg-[#2E8B57] py-1 px-2 xl:font-semibold xl:px-3 xl:tracking-wide"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskComponent;
