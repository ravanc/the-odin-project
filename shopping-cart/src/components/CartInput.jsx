import React from "react";
import { useState, useEffect } from "react";

export default function CartInput({ cartCount, setCartCount }) {
  const [isEditing, setIsEditing] = useState(false);
  function handleClick() {
    setIsEditing(true);
    setTimeout(() => {
      document.addEventListener(
        "click",
        () => {
          setIsEditing(false);
          console.log("click");
          console.log(document.getElementById("cartInput").value);
          setCartCount(Number(document.getElementById("cartInput").value));
        },
        { once: true }
      ),
        10;
    });
  }

  useEffect(() => {
    console.log(document.getElementById("cartInput"));
    document.getElementById("cartInput").focus();
  }, [isEditing]);

  return (
    <>
      <input
        id="cartInput"
        type="number"
        className={`[appearance:textfield] ${isEditing ? "inline" : "hidden"}`}
      />
      <div
        onClick={handleClick}
        className={`${isEditing ? "hidden" : "inline"}`}
      >
        {cartCount}
      </div>
    </>
  );
}
