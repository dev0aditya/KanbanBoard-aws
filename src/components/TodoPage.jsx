import React, { useState, useEffect } from "react";
import HeaderInput from "./HeaderInput";
import TaskContainer from "./TaskContainer";
import TaskComponent from "./TaskComponent";
import {
  DndContext,
  closestCorners,
  DragOverlay as DragOverlayComponent,
  useSensors,
  PointerSensor,
  TouchSensor,
  useSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function TodoPage() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [activeDraggingItemId, setActiveDraggingItemId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragStart = (event) => {
    setActiveDraggingItemId(event.active.id);
  };

  const handleDragOver = (event) => {
    setActiveDraggingItemId(event.over?.id || null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveDraggingItemId(null);

    if (!over) return;

    if (
      active.id !== over.id &&
      active.data.current.sortable.containerId !==
        over.data.current.sortable.containerId
    ) {
      const movedTask = tasks.find((task) => task.id === active.id);
      const updatedTasks = tasks.map((task) =>
        task.id === movedTask.id
          ? { ...task, status: over.data.current.sortable.containerId }
          : task
      );

      setTasks(updatedTasks);
    } else {
      setTasks((tasks) => {
        const originalPos = getTaskPos(active.id);
        const newPos = getTaskPos(over.id);
        return arrayMove(tasks, originalPos, newPos);
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function DragOverlay2({ activeId, tasks }) {
    const activeTask = tasks.find((task) => task.id === activeId);

    return activeTask ? (
      <DragOverlayComponent
        style={{
          opacity: 0.3,
        }}
      >
        <TaskComponent
          task={activeTask}
          tasks={tasks}
          setTasks={() => {}}
          containerId={activeTask.status}
        />
      </DragOverlayComponent>
    ) : null;
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <HeaderInput setTasks={setTasks} />
      <div className="border-t-[1px] opacity-20"></div>
      <div className="px-6 xl:px-10 flex gap-5 flex-col py-5 lg:flex-row">
        <SortableContext
          id="todo"
          items={tasks.filter((task) => task.status === "todo")}
          strategy={verticalListSortingStrategy}
        >
          <TaskContainer
            title="Todo"
            tasks={tasks}
            setTasks={setTasks}
            status="todo"
          />
        </SortableContext>
        <SortableContext
          id="in-progress"
          items={tasks.filter((task) => task.status === "in-progress")}
          strategy={verticalListSortingStrategy}
        >
          <TaskContainer
            title="In-Progress"
            tasks={tasks}
            setTasks={setTasks}
            status="in-progress"
          />
        </SortableContext>
        <SortableContext
          id="done"
          items={tasks.filter((task) => task.status === "done")}
          strategy={verticalListSortingStrategy}
        >
          <TaskContainer
            title="Done"
            tasks={tasks}
            setTasks={setTasks}
            status="done"
          />
        </SortableContext>
      </div>
      <DragOverlay2 activeId={activeDraggingItemId} tasks={tasks} />
    </DndContext>
  );
}

export default TodoPage;
