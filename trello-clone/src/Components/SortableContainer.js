import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import SortableItem from "./SortableItem";

export default function SortableContainer({ data, title }) {
  const { setNodeRef } = useDroppable({ id: title });

  return (
    <SortableContext
      id={title}
      items={data}
      strategy={verticalListSortingStrategy}
    >
      <div
        className="bg-[#F1F2F4] flex flex-col justify-center rounded-xl overflow-hidden w-[25rem] px-[7px] h-[100%] mr-4"
        ref={setNodeRef}
      >
        <h3 className="my-[1rem] ml-4 text-[#2C3E5D]">{title}</h3>
        {data.map((datum) => (
          <SortableItem key={datum.id} datum={datum} />
        ))}
      </div>
    </SortableContext>
  );
}
