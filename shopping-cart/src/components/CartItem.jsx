import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import starIcon from "../assets/star.png";

export default function CartItem({ item }) {
  const [itemObject, setItemObject] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(item.count);

  useEffect(() => {
    async function loadItem(id) {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await response.json();
        setItemObject(product);
      } catch (err) {
        throw new Error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadItem(item.id);
  }, []);

  if (isLoading) return <div>Loading</div>;

  if (!isLoading)
    return (
      <div className="flex">
        <Link to={`/item/${itemObject.id}`}>
          <img
            src={itemObject.image}
            alt={`${itemObject.title} image`}
            className="w-[125px] h-[125px] object-contain"
          />
        </Link>
        <div className="flex flex-col justify-center pl-12">
          <Link to={`/item/${itemObject.id}`}>
            <p className="text-xl font-medium">{itemObject.title}</p>
          </Link>
          {/* <p>${itemObject.price.toFixed(2)}</p> */}
          <div className="flex gap-1 items-center">
            <img src={starIcon} alt="User Rating: " className="w-4 h-4" />
            <p>{itemObject.rating.rate.toFixed(1)}</p>
          </div>
          <p className="font-light italic text-sm">In Cart: {cartCount}</p>
        </div>
      </div>
    );
}
