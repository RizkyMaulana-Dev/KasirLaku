import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Landing = lazy(() => import('./screens/Landing'));
const Login = lazy(() => import('./screens/Login'));
const Cashier = lazy(() => import('./screens/Cashier'));
const Payment = lazy(() => import('./screens/Payment'));
const History = lazy(() => import('./screens/History'));
const Products = lazy(() => import('./screens/Products'));

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-muted text-sm">Memuat…</div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kasir" element={<Cashier />} />
        <Route path="/bayar" element={<Payment />} />
        <Route path="/riwayat" element={<History />} />
        <Route path="/produk" element={<Products />} />
      </Routes>
    </Suspense>
  );
}
