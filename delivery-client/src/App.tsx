import { useState, useEffect } from 'react';
import { api } from './services/api';
import type { JoinedOrder, CreateOrderPayload } from './types';
import { OrderForm } from './components/OrderForm';
import { OrderList } from './components/OrderList';
import { OrderDetailModal } from './components/OrderDetailModal';

export default function App() {
  const [orders, setOrders] = useState<JoinedOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<JoinedOrder | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const data = await api.getOrders();
      setOrders(data);
    } catch (err: unknown) {
      console.error('Failed to fetch orders:', err);
      setErrorMessage('Не удалось загрузить список заказов с сервера.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    api.getOrders()
      .then((data) => {
        if (isSubscribed) {
          setOrders(data);
          setErrorMessage(null);
        }
      })
      .catch((err: unknown) => {
        if (isSubscribed) {
          console.error('Failed to fetch orders:', err);
          setErrorMessage('Не удалось загрузить список заказов с сервера.');
        }
      })
      .finally(() => {
        if (isSubscribed) {
          setLoading(false);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleCreateOrder = async (payload: CreateOrderPayload) => {
    setLoading(true);
    try {
      await api.createOrder(payload);
      await fetchOrders();
    } catch (err: unknown) {
      alert('Ошибка при создании заказа: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      {/* Шапка */}
      <header className="pb-3 mb-4 border-bottom border-secondary">
        <h1 className="h3 mb-0 text-light fw-bold">
          Система заказов доставки (VERSTA)
        </h1>
      </header>

      {/* Ошибка при запросе */}
      {errorMessage && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center mb-4 small" role="alert">
          <div>{errorMessage}</div>
          <button onClick={fetchOrders} className="btn btn-outline-light btn-sm ms-3">
            Повторить
          </button>
        </div>
      )}

      {/* Сетка компонентов */}
      <div className="row g-4">
        <div className="col-lg-4">
          <OrderForm onSubmit={handleCreateOrder} loading={loading} />
        </div>
        <div className="col-lg-8">
          <OrderList
            orders={orders}
            loading={loading}
            onSelectOrder={setSelectedOrder}
          />
        </div>
      </div>

      {/* Модальное окно деталей */}
      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
