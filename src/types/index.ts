export interface Product {
  id?: number;
  name: string;
  price: number; // Rupiah integer, no decimals (ER-09)
  category: string;
  stock: number;
  active: boolean;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderItem {
  id?: number;
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id?: number;
  orderNumber: string;
  status: 'active' | 'held' | 'completed' | 'cancelled';
  cashierName: string;
  items: OrderItem[];
  total: number;
  paymentMethod?: 'cash' | 'qris' | 'transfer';
  amountReceived?: number;
  change?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id?: number;
  orderId: number;
  method: 'cash' | 'qris' | 'transfer';
  amountReceived: number;
  change: number;
  status: 'pending' | 'success' | 'failed';
  idempotencyKey: string;
  createdAt: Date;
}

export interface User {
  id?: number;
  name: string;
  pinHash: string;
  role: 'cashier' | 'manager' | 'owner';
  active: boolean;
  failedAttempts: number;
  lockedUntil?: Date;
  createdAt: Date;
}

export interface CashierSession {
  id?: number;
  cashierName: string;
  pinHash: string;
  role: 'cashier' | 'manager' | 'owner';
  active: boolean;
  failedAttempts: number;
  lockedUntil?: Date;
}

export interface SyncQueue {
  id?: number;
  entity: 'order' | 'payment';
  entityId: number;
  action: 'create' | 'update';
  payload: string;
  attempts: number;
  lastAttempt?: Date;
  createdAt: Date;
}
