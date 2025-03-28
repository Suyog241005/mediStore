import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { medicines } from './data/medicines';
import { MedicineCard } from './components/MedicineCard';
import { Cart } from './components/Cart';
import { CheckoutForm } from './components/CheckoutForm';
import { CartItem, Medicine, OrderDetails } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (medicine: Medicine) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === medicine.id);
      if (existingItem) {
        return items.map((item) =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...medicine, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleCheckout = (details: OrderDetails) => {
    console.log('Order placed:', { details, items: cartItems });
    setOrderPlaced(true);
    setCartItems([]);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase. Your order will be delivered soon.</p>
          <button
            onClick={() => {
              setOrderPlaced(false);
              setShowCheckout(false);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">MediShop</h1>
          <button
            onClick={() => setShowCheckout(true)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ShoppingBag />
            <span className="font-medium">{cartItems.length}</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {showCheckout ? (
          <div className="grid md:grid-cols-2 gap-8">
            <Cart
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
            <CheckoutForm items={cartItems} onSubmit={handleCheckout} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicines.map((medicine) => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;