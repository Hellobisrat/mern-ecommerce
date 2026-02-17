import { create } from "zustand";
import api from "../utils/api";

export const useCartStore = create((set, get) => ({
  items: [],        // MUST start as an array
  loading: false,

  loadCart: async (userId) => {
    try {
      set({ loading: true });
      const res = await api.get(`/cart/${userId}`);
      set({ items: res.data.cart.items || [], loading: false });
    } catch (err) {
      console.error("LOAD CART ERROR:", err);
      set({ loading: false });
    }
  },

  addToCart: async (payload) => {
    try {
      const res = await api.post("/cart/add", payload);
      set({ items: res.data.cart.items || [] });

    } catch (err) {
      console.error("ADD CART ERROR:", err);
    }
  },

  removeFromCart: async ({ userId, productId }) => {
    try {
      const res = await api.delete("/cart/remove", {
        data: { userId, productId },
      });
       set({ items: res.data.cart.items || [] });

    } catch (err) {
      console.error("REMOVE CART ERROR:", err);
    }
  },
  updateCart: async ({ userId, productId, variantId, quantity }) => {
  try {
    const res = await api.put("/cart/update", {
      userId,
      productId,
      variantId,
      quantity,
    });
    set({ items: res.data.cart.items || [] });
  } catch (err) {
    console.error("UPDATE CART ERROR:", err);
  }
},

 clearCart: () => {
    set({ items: [] });
},




  total: () => {
    const items = get().items || [];
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));