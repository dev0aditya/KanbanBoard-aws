import React from "react";
import TaskComponent from "./TaskComponent";

function TaskContainer({ title, tasks, setTasks, status }) {
  const filteredTasks = tasks.filter((task) => task.status === status);
  return (
    <div className="px-4 pt-2 pb-4 xl:px-5 xl:pt-3 xl:pb-6 min-h-52 bg-[#383c41] lg:w-1/3">
      <h1 className="text-2xl xl:text-3xl tracking-wider font-thin mb-3 xl:mb-4">
        {title}
      </h1>
      <div className="task-List flex flex-col gap-3 xl:gap-4">
        {filteredTasks.map((task) => (
          <TaskComponent
            key={task.id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskContainer;
