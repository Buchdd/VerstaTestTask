import type { JoinedOrder } from '../types';
import {
  getSenderObject,
  getRecipientObject,
  formatAddress,
  getCargoWeightText,
  getDateText,
} from '../utils/formatters';

interface OrderListProps {
  orders: JoinedOrder[];
  loading: boolean;
  onSelectOrder: (order: JoinedOrder) => void;
}

export function OrderList({ orders, loading, onSelectOrder }: OrderListProps) {
  return (
    <div className="card bg-dark text-light border-secondary shadow-sm">
      <div className="card-header bg-body-tertiary border-secondary py-3 d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0 h6 fw-bold">Список заказов</h5>
        <span className="badge bg-secondary">{orders.length}</span>
      </div>
      <div className="card-body p-0">
        {loading && orders.length === 0 ? (
          <div className="text-center text-muted p-4 small">Загрузка заказов...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-muted p-4 small">Заказов пока нет</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0 align-middle small">
              <thead className="table-secondary">
                <tr>
                  <th scope="col" className="px-3">ID</th>
                  <th scope="col">Откуда</th>
                  <th scope="col">Куда</th>
                  <th scope="col">Вес</th>
                  <th scope="col">Дата забора</th>
                  <th scope="col" className="text-end px-3">Действие</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const rec = o as unknown as Record<string, unknown>;
                  const senderObj = getSenderObject(rec);
                  const recipientObj = getRecipientObject(rec);
                  const senderStr = formatAddress(senderObj);
                  const recipientStr = formatAddress(recipientObj);
                  const weightStr = getCargoWeightText(rec);
                  const dateStr = getDateText(o.datePickup);

                  return (
                    <tr key={o.id}>
                      <th scope="row" className="px-3 text-info">#{o.id}</th>
                      <td className="text-truncate" style={{ maxWidth: '180px' }} title={senderStr}>{senderStr}</td>
                      <td className="text-truncate" style={{ maxWidth: '180px' }} title={recipientStr}>{recipientStr}</td>
                      <td className="fw-semibold text-warning">{weightStr}</td>
                      <td className="text-muted">{dateStr}</td>
                      <td className="text-end px-3">
                        <button
                          onClick={() => onSelectOrder(o)}
                          className="btn btn-outline-info btn-sm py-0 px-2"
                        >
                          Детали
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
