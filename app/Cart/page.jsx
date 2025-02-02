"use client";
import '../../app/globals.css';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsTrash } from "react-icons/bs";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleRemoveFromCart = (itemIndex) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart.splice(itemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center bg-white shadow-md">
        <h1 className="text-4xl font-bold">Furniro</h1>
        <Link href="/Cart" className="flex items-center gap-2 text-sky-500 text-3xl">
          <span>Cart ({cart.length})</span>
        </Link>
      </nav>

      <div className="container mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row gap-8">
        {/* Left - Cart Items (80%) */}
        <div className="w-full md:w-4/5 bg-white shadow-lg rounded-lg p-6 md:p-8">
          <table className="w-full">
            <thead className="bg-beige text-left">
              <tr>
                <th className="p-4 text-3xl">Product</th>
                <th className="p-4 text-3xl hidden md:table-cell">Price</th>
                <th className="p-4 text-3xl hidden md:table-cell">Quantity</th>
                <th className="p-4 text-3xl hidden md:table-cell">Subtotal</th>
                <th className="p-4 text-3xl"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 flex items-center gap-4">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-2xl font-semibold">{item.title}</h3>
                      <p className="text-xl md:hidden">
                        Rs {(item.price * item.quantity).toFixed(2)} | Qty: {item.quantity}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-2xl hidden md:table-cell">
                    Rs {item.price.toFixed(2)}
                  </td>
                  <td className="p-4 text-2xl hidden md:table-cell">
                    {item.quantity}
                  </td>
                  <td className="p-4 text-2xl hidden md:table-cell">
                    Rs {(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleRemoveFromCart(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <BsTrash className="text-4xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right - Cart Totals (20%) */}
        <div className="w-full md:w-1/5 bg-beige p-6 shadow-lg rounded-lg">
          <h3 className="text-3xl font-bold mb-4">Cart Totals</h3>
          <div className="flex justify-between mb-4 text-2xl">
            <span>Subtotal:</span>
            <span>Rs {calculateTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-6 text-4xl font-semibold text-gold">
            <span>Total:</span>
            <span>Rs {calculateTotal().toFixed(2)}</span>
          </div>
          <button
            onClick={() => alert("Proceeding to Checkout")}
            className="w-full bg-black text-white py-4 text-2xl rounded-lg hover:bg-gray-800"
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
