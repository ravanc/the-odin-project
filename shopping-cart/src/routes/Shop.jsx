import React from "react";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ItemCard from "../components/ItemCard";

export default function Shop() {
  const items = useLoaderData();

  return (
    <div>
      {items.map((item, index) => {
        return index + 1 < items.length ? (
          <div key={index}>
            <ItemCard item={item} key={item.id} style={"p-8"} />
            <div className="h-[1px] bg-gray-300" key={index}></div>
          </div>
        ) : (
          <div key={index}>
            <ItemCard item={item} key={item.id} style={"p-8"} />
          </div>
        );
      })}
    </div>
  );
}
