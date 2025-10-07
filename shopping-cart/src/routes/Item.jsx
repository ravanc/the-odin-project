import React from "react";
import { useState } from "react";
import { useLoaderData, useOutletContext, useParams } from "react-router-dom";

import starIcon from "../assets/star.png";
import addIcon from "../assets/add.svg";
import CartInput from "../components/CartInput";

export default function Item() {
  const { id } = useParams();
  const [cartCount, setCartCount] = useState(0);
  const item = useLoaderData();
  const [cart, setCart] = useOutletContext();

  function addToCart() {
    const cartItem = cart.find((item) => item.id === id);
    let updatedCart;
    if (cartItem) {
      updatedCart = cart.map((item) => {
        if (item.id === id) {
          return { id: item.id, count: (item.count += cartCount) };
        } else {
          return item;
        }
      });
    } else {
      updatedCart = [...cart, { id: id, count: cartCount }];
    }
    setCart(updatedCart);
  }

  return (
    <div className="flex">
      <img src={item.image} className="w-[220px]" />
      <div className="flex flex-col">
        <div className="font-medium text-2xl">{item.title}</div>
        <div className="flex gap-2 items-center">
          <img src={starIcon} alt="User Ratings: " className="w-6" />
          <div>{item.rating.rate}</div>
          <div className="bg-gray-400 h-5 w-[1px]"></div>
          <div>{item.rating.count} in stock</div>
        </div>
        <div>Category: {item.category}</div>
        <div>Item Description:</div>
        <div>{item.description}</div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => cartCount > 0 && setCartCount(cartCount - 1)}
            className="bg-blue-600 rounded-full w-4 h-4 flex justify-center items-center text-white"
          >
            -
          </button>
          <CartInput cartCount={cartCount} setCartCount={setCartCount} />
          <button
            onClick={() => setCartCount(cartCount + 1)}
            className="bg-blue-600 rounded-full w-4 h-4 flex justify-center items-center text-white"
          >
            +
          </button>
          <button
            className="bg-blue-600 flex p-2 pr-3 rounded-lg text-white"
            onClick={addToCart}
          >
            <img src={addIcon} alt="add" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
