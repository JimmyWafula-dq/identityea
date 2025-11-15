import React, { createContext, useContext, useReducer, useEffect } from "react";

// ---------------------------------------------------------------------
// 1. Context & Reducer
// ---------------------------------------------------------------------
const QuoteCartContext = createContext();

const ACTIONS = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  UPDATE_QTY: "UPDATE_QTY",
  CLEAR: "CLEAR",
};

function quoteCartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD: {
      const existingIdx = state.findIndex(
        (i) =>
          i.productId === action.payload.productId &&
          i.tierKey === action.payload.tierKey
      );

      if (existingIdx > -1) {
        // same product + same tier → just increase quantity
        const updated = [...state];
        updated[existingIdx].quantity += action.payload.quantity;
        return updated;
      }

      return [...state, action.payload];
    }

    case ACTIONS.REMOVE:
      return state.filter((_, idx) => idx !== action.payload.index);

    case ACTIONS.UPDATE_QTY:
      return state.map((item, idx) =>
        idx === action.payload.index
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case ACTIONS.CLEAR:
      return [];

    default:
      return state;
  }
}

// ---------------------------------------------------------------------
// 2. Provider component
// ---------------------------------------------------------------------
export function QuoteCartProvider({ children }) {
  const [quoteItems, dispatch] = useReducer(quoteCartReducer, [], (initial) => {
    // load from localStorage on first mount
    const stored = localStorage.getItem("quoteCart");
    return stored ? JSON.parse(stored) : initial;
  });

  // keep localStorage in sync
  useEffect(() => {
    localStorage.setItem("quoteCart", JSON.stringify(quoteItems));
  }, [quoteItems]);

  // -----------------------------------------------------------------
  // 3. Helper actions
  // -----------------------------------------------------------------
  const addQuoteItem = ({
    productId,
    productName,
    image,
    categoryName,
    tierKey, // e.g. "twotonine" or "fixed"
    tierLabel, // human readable, e.g. "200 - 999 Pcs"
    price, // number
    quantity = 1,
  }) => {
    dispatch({
      type: ACTIONS.ADD,
      payload: {
        productId,
        productName,
        image,
        categoryName,
        tierKey,
        tierLabel,
        price,
        quantity,
      },
    });
  };

  const removeQuoteItem = (index) => {
    dispatch({ type: ACTIONS.REMOVE, payload: { index } });
  };

  const updateQuantity = (index, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: ACTIONS.UPDATE_QTY, payload: { index, quantity } });
  };

  const clearQuoteCart = () => {
    dispatch({ type: ACTIONS.CLEAR });
  };

  const totalItems = quoteItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = quoteItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const value = {
    quoteItems,
    addQuoteItem,
    removeQuoteItem,
    updateQuantity,
    clearQuoteCart,
    totalItems,
    totalPrice,
  };

  return (
    <QuoteCartContext.Provider value={value}>
      {children}
    </QuoteCartContext.Provider>
  );
}

// ---------------------------------------------------------------------
// 4. Hook for components
// ---------------------------------------------------------------------
export function useQuoteCart() {
  const context = useContext(QuoteCartContext);
  if (!context) {
    throw new Error("useQuoteCart must be used within QuoteCartProvider");
  }
  return context;
}
