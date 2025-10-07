import React from "react";
import { useOutletContext } from "react-router-dom";
import CartItem from "../components/CartItem";

export default function Cart() {
  const [cart, setCart] = useOutletContext();

  return (
    <div>
      <div className="">{JSON.stringify(cart)}</div>
      <div>
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
