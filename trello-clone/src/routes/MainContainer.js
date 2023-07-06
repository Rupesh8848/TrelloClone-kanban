import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  defaultDropAnimation,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import React, { useState } from "react";
import SortableContainer from "../Components/SortableContainer";
import SortableItem from "../Components/SortableItem";
import { INITIAL_TASKS } from "../data/mockData";
import { findBoardSectionContainer, initializeBoard } from "../utils/board";
import { getTaskById } from "../utils/tasks";

export default function MainContainer() {
  const tasks = INITIAL_TASKS;
  const initialBoardSections = initializeBoard(tasks);

  const [boardSections, setBoardSections] =
    React.useState(initialBoardSections);

  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  //handler functions

  const handleDragStart = (event) => {
    setActiveTask(event.active.id); //active item is an object of current item
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    const activeContainer = findBoardSectionContainer(boardSections, active.id);

    const overContainer = findBoardSectionContainer(boardSections, over.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((prevState) => {
      const activeItems = prevState[activeContainer];
      const overItems = prevState[overContainer];

      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );

      const overIndex = overItems.findIndex((item) => item.id !== over?.id);
      return {
        ...prevState,
        [activeContainer]: [
          ...prevState[activeContainer].filter((item) => item.id !== active.id),
        ],
        [overContainer]: [
          ...prevState[overContainer].slice(0, overIndex),
          prevState[activeContainer][activeIndex],
          ...prevState[overContainer].slice(
            overIndex,
            prevState[overContainer].length
          ),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }) => {
    const activeContainer = findBoardSectionContainer(boardSections, active.id);

    const overContainer = findBoardSectionContainer(boardSections, over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (item) => item.id === active.id
    );

    const overIndex = boardSections[overContainer].findIndex(
      (item) => item.id === over.id
    );
    if (activeIndex !== overIndex) {
      setBoardSections((prevState) => ({
        ...prevState,
        [overContainer]: arrayMove(
          prevState[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }
    setActiveTask(null);
  };

  const dropAnimation = {
    ...defaultDropAnimation,
  };

  const currentTask = getTaskById(tasks, activeTask);

  return (
    <div className="h-[100vh] min-w-[100vw]   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex  items-center px-[1rem] overflow-x-scroll">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="flex justify-evenly">
          {Object.keys(boardSections).map((boardSectionKey) => (
            <SortableContainer
              key={boardSectionKey}
              data={boardSections[boardSectionKey]}
              title={boardSectionKey}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={dropAnimation}>
          {activeTask ? <SortableItem datum={currentTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
