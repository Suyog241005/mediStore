import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';

interface Props {
  items: CartItem[];
  onSubmit: (details: OrderDetails) => void;
}

export const CheckoutForm: React.FC<Props> = ({ items, onSubmit }) => {
  const [details, setDetails] = useState<OrderDetails>({
    name: '',
    mobile: '',
    address: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="tel"
            required
            pattern="[0-9]{10}"
            value={details.mobile}
            onChange={(e) => setDetails({ ...details, mobile: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
          <textarea
            required
            value={details.address}
            onChange={(e) => setDetails({ ...details, address: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="border-t pt-4">
          <p className="text-lg font-semibold">Order Total: ₹{total}</p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};