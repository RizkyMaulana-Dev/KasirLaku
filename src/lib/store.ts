import { create } from 'zustand';
import type { Order, OrderItem } from '../types';
import { db } from './db';

export interface CartItem extends OrderItem {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
}

export interface AppState {
  // Auth
  cashierName: string | null;
  login: (name: string) => void;
  logout: () => void;

  // Cart / Order
  activeOrderId: number | null;
  cartItems: CartItem[];
  heldOrders: Order[];
  lastRemoved: CartItem | null;
  addToCart: (item: CartItem) => void;
  increment: (productId: number) => void;
  decrement: (productId: number) => void;
  clearCart: () => void;
  undo: () => void;
  holdOrder: () => Promise<void>;
  resumeOrder: (orderId: number) => Promise<void>;
  loadHeld: () => Promise<void>;

  // UI
  offline: boolean;
  setOffline: (v: boolean) => void;
}

async function nextOrderNumber() {
  const count = await db.orders.count();
  return `#${count + 1}`;
}

export const cartTotal = (items: CartItem[]) =>
  items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);

export const useAppStore = create<AppState>((set, get) => ({
  cashierName: null,
  login: (name) => set({ cashierName: name }),
  logout: () => set({ cashierName: null, cartItems: [], activeOrderId: null }),

  activeOrderId: null,
  cartItems: [],
  heldOrders: [],
  lastRemoved: null,

  addToCart: (item) => set((s) => {
    const idx = s.cartItems.findIndex((c) => c.productId === item.productId);
    if (idx >= 0) {
      const items = [...s.cartItems];
      items[idx] = { ...items[idx], quantity: items[idx].quantity + item.quantity };
      return { cartItems: items };
    }
    return { cartItems: [...s.cartItems, item] };
  }),

  increment: (productId) => set((s) => ({
    cartItems: s.cartItems.map((c) =>
      c.productId === productId ? { ...c, quantity: c.quantity + 1 } : c
    ),
  })),

  decrement: (productId) => set((s) => {
    const item = s.cartItems.find((c) => c.productId === productId);
    if (!item) return s;
    const nextQty = item.quantity - 1;
    const removed = { ...item, quantity: item.quantity };
    return {
      cartItems: nextQty <= 0
        ? s.cartItems.filter((c) => c.productId !== productId)
        : s.cartItems.map((c) => c.productId === productId ? { ...c, quantity: nextQty } : c),
      lastRemoved: nextQty <= 0 ? removed : null,
    };
  }),

  clearCart: () => set({ cartItems: [], activeOrderId: null, lastRemoved: null }),

  undo: () => set((s) => {
    if (!s.lastRemoved) return s;
    return {
      cartItems: [...s.cartItems, s.lastRemoved],
      lastRemoved: null,
    };
  }),

  holdOrder: async () => {
    const { cartItems, cashierName, activeOrderId } = get();
    if (cartItems.length === 0) return;
    const total = cartTotal(cartItems);
    const orderNumber = await nextOrderNumber();

    if (activeOrderId) {
      await db.orders.update(activeOrderId, {
        orderNumber,
        status: 'held',
        items: cartItems,
        total,
        updatedAt: new Date(),
      });
    } else {
      await db.orders.add({
        orderNumber,
        status: 'held',
        cashierName: cashierName ?? 'Kasir',
        items: cartItems,
        total,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    set({ activeOrderId: null, cartItems: [] });
    get().loadHeld();
  },

  resumeOrder: async (orderId) => {
    const order = await db.orders.get(orderId);
    if (!order || order.status !== 'held') return;
    await db.orders.update(orderId, { status: 'active', updatedAt: new Date() });
    set({ activeOrderId: orderId, cartItems: order.items || [] });
    get().loadHeld();
  },

  loadHeld: async () => {
    const held = await db.orders.where('status').equals('held').toArray();
    set({ heldOrders: held });
  },

  offline: false,
  setOffline: (v) => set({ offline: v }),
}));