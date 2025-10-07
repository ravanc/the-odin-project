import React from "react";
import { Link } from "react-router-dom";

import starIcon from "../assets/star.png";

export default function ItemCard({ item, style }) {
  return (
    <div className={`flex ${style}`}>
      <Link to={`/item/${item.id}`}>
        <img
          src={item.image}
          alt={`${item.title} image`}
          className="w-[125px] h-[125px] object-contain"
        />
      </Link>
      <div className="flex flex-col justify-center pl-12">
        <Link to={`/item/${item.id}`}>
          <p className="text-xl font-medium">{item.title}</p>
        </Link>
        <p>${item.price.toFixed(2)}</p>
        <div className="flex gap-1 items-center">
          <img src={starIcon} alt="User Rating: " className="w-4 h-4" />
          <p>{item.rating.rate.toFixed(1)}</p>
        </div>
        <p className="font-light italic text-sm">
          In Stock: {item.rating.count}
        </p>
      </div>
    </div>
  );
}
