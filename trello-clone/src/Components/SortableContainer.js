import { useDraggable, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import SortableItem from "./SortableItem";
import { CSS } from "@dnd-kit/utilities";

export default function SortableContainer({ data, title }) {
  const {
    attributes,
    listeners,
    setNodeRef: containerRef,
    transform,
    transition,
    isDragging,
  } = useDraggable({ id: title });

  const { setNodeRef } = useDroppable({ id: title });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? "0.6" : "1",
  };
  return (
    <div ref={containerRef} style={style} {...attributes} {...listeners}>
      <SortableContext
        id={title}
        items={data}
        strategy={verticalListSortingStrategy}
      >
        <div
          className="bg-[#F1F2F4] flex flex-col justify-center rounded-xl overflow-hidden w-[25rem] px-[7px]  mr-4"
          ref={setNodeRef}
        >
          <h3 className="my-[1rem] ml-4 text-[#2C3E5D]">{title}</h3>
          {data.map((datum) => (
            <SortableItem key={datum.id} datum={datum} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
