import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Medicine } from '../types';

interface Props {
  medicine: Medicine;
  onAddToCart: (medicine: Medicine) => void;
}

export const MedicineCard: React.FC<Props> = ({ medicine, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={medicine.image} 
        alt={medicine.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{medicine.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{medicine.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">₹{medicine.price}</span>
          <button
            onClick={() => onAddToCart(medicine)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};