import React, { useState, useEffect } from "react";
import HeaderInput from "./HeaderInput";
import TaskContainer from "./TaskContainer";

function TodoPage() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <HeaderInput setTasks={setTasks} />
      <div className="border-t-[1px] opacity-20"></div>
      <div className="px-6 xl:px-10 flex gap-5 flex-col py-5 lg:flex-row">
        <TaskContainer
          title="Todo"
          tasks={tasks}
          setTasks={setTasks}
          status="todo"
        />
        <TaskContainer
          title="In-Progress"
          tasks={tasks}
          setTasks={setTasks}
          status="in-progress"
        />
        <TaskContainer
          title="Done"
          tasks={tasks}
          setTasks={setTasks}
          status="done"
        />
      </div>
    </>
  );
}

export default TodoPage;
