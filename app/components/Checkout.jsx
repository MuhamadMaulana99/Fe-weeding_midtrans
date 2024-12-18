import React, { useState } from "react";
import { product } from "../libs/product";

// https://simulator.sandbox.midtrans.com/bca/va/index
const Checkout = () => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((prevState) => (quantity > 1 ? prevState - 1 : null));
  };

  const increaseQuantity = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const checkout = async () => {
    // alert("Checkout SNAP! 🌟");
    const data = {
      id: product?.id,
      productName: product?.name,
      price: product?.price,
      quantity: quantity,
    };
    const response = await fetch("/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Pastikan ini ditambahkan untuk mengirim data JSON
      },
      body: JSON.stringify(data),
    });
    const requsetData = await response.json();
    // window.snap.pay(requsetData.token)
    window.snap.pay(requsetData.token);
  };

  const generatePaymentLink = async () => {
    alert("Checkout Payment Link! 🔥");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex sm:gap-4">
          <button
            className="transition-all hover:opacity-75"
            onClick={decreaseQuantity}
          >
            ➖
          </button>

          <input
            type="number"
            id="quantity"
            value={quantity}
            className="h-10 w-16 text-black border-transparent text-center"
            onChange={quantity}
            // onChange={(e) => setQuantity(parseInt(e.target.value))}
          />

          <button
            className="transition-all hover:opacity-75"
            onClick={increaseQuantity}
          >
            ➕
          </button>
        </div>
        <button
          className="rounded bg-indigo-500 p-4 text-sm font-medium transition hover:scale-105"
          onClick={checkout}
        >
          Checkout
        </button>
      </div>
      <button
        className="text-indigo-500 py-4 text-sm font-medium transition hover:scale-105"
        onClick={generatePaymentLink}
      >
        Create Payment Link
      </button>
    </>
  );
};

export default Checkout;
