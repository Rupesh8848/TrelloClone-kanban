import React from "react";

export default function DataItem({ data }) {
  return (
    <div className="w-[100%] flex items-center justify-center h-[2rem] bg-white rounded-lg text-center">
      <h3>{data.title}</h3>
      <p>{data.description}</p>
    </div>
  );
}
