import Dexie, { type EntityTable } from 'dexie';
import type { Product, Order, OrderItem, Payment, SyncQueue, User } from '../types';

export class KasirLakuDB extends Dexie {
  products!: EntityTable<Product, 'id'>;
  orders!: EntityTable<Order, 'id'>;
  orderItems!: EntityTable<OrderItem, 'id'>;
  payments!: EntityTable<Payment, 'id'>;
  users!: EntityTable<User, 'id'>;
  syncQueue!: EntityTable<SyncQueue, 'id'>;

  constructor() {
    super('kasirlaku');
    this.version(1).stores({
      products: '++id, name, category, active, stock, createdAt',
      orders: '++id, orderNumber, status, cashierName, createdAt',
      orderItems: '++id, orderId, productId',
      payments: '++id, orderId, status, createdAt, idempotencyKey',
      users: '++id, name, role, active',
      syncQueue: '++id, entity, entityId, attempts, createdAt',
    });
  }
}

export const db = new KasirLakuDB();

// ponytail: seed runs when empty; add when you want more test data
export async function seedEmpty() {
  const count = await db.products.count();
  if (count > 0) return;
  await db.products.bulkAdd([
    { name: 'Kopi Susu', price: 18000, category: 'Minuman', stock: 99, active: true, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Teh Tarik', price: 15000, category: 'Minuman', stock: 50, active: true, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Nasi Goreng', price: 25000, category: 'Makanan', stock: 20, active: true, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Mie Goreng', price: 22000, category: 'Makanan', stock: 0, active: true, createdAt: new Date(), updatedAt: new Date() },
  ]);
  await db.users.bulkAdd([
    { name: 'Budi', pinHash: '1234', role: 'owner', active: true, failedAttempts: 0, createdAt: new Date() },
    { name: 'Siti', pinHash: '2345', role: 'cashier', active: true, failedAttempts: 0, createdAt: new Date() },
  ]);
}
