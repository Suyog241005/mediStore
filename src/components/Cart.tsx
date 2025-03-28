import React from 'react';
import { X } from 'lucide-react';
import { CartItem } from '../types';

interface Props {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export const Cart: React.FC<Props> = ({ items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-2 border-b">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                  className="border rounded p-1"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right">
            <p className="text-lg font-semibold">Total: ₹{total}</p>
          </div>
        </>
      )}
    </div>
  );
};