import React from "react";
import { useQuoteCart } from "@/context/QuoteCartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import AppLayout from "@/layout/AppLayout";
import { baseUrl } from "@/lib/api";

export default function QuoteCartPage() {
  const {
    quoteItems,
    removeQuoteItem,
    updateQuantity,
    clearQuoteCart,
    totalItems,
    totalPrice,
  } = useQuoteCart();

  if (quoteItems.length === 0) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto py-12 text-center">
          <p className="text-lg text-gray-600">No quote requests yet.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Quote Requests</h1>

        <div className="space-y-4">
          {quoteItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm"
            >
              <img
                src={`${baseUrl}/${item.image}`}
                alt={item.productName}
                className="w-20 h-20 object-contain rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.productName}</h3>
                <p className="text-sm text-gray-600">
                  {item.categoryName} • {item.tierLabel}
                </p>
                <p className="font-semibold">Kes. {item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity < i > (idx, item.quantity - 1)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(idx, item.quantity + 1)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => removeQuoteItem(idx)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div>
            <p className="text-lg">
              Total Items: <strong>{totalItems}</strong>
            </p>
            <p className="text-xl font-bold">
              Total Estimate: Kes. {totalPrice.toLocaleString()}
            </p>
          </div>
          <button
            onClick={clearQuoteCart}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Clear All
          </button>
        </div>

        {/* ---- Later you will POST quoteItems to your backend ---- */}
        <button
          onClick={async () => {
            // Example:
            // await api.post("/orders/quote", { items: quoteItems });
            // clearQuoteCart();
            // toast.success("Quotes saved!");
          }}
          className="mt-6 w-full bg-black text-white py-3 rounded-xl font-medium"
        >
          Save Quotes to DB (implement later)
        </button>
      </div>
    </AppLayout>
  );
}
