import type { JoinedOrder } from '../types';
import {
  getSenderObject,
  getRecipientObject,
  formatAddress,
  getCargoWeightText,
  getDateText,
} from '../utils/formatters';

interface OrderDetailModalProps {
  order: JoinedOrder | null;
  onClose: () => void;
}

export function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  if (!order) return null;

  const rec = order as unknown as Record<string, unknown>;

  return (
    <div className="modal d-block bg-dark bg-opacity-75" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-light border-secondary shadow-lg">
          <div className="modal-header border-secondary">
            <h5 className="modal-title h6 fw-bold">
              Детали заказа <span className="text-info">#{order.id}</span>
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="p-3 bg-body-tertiary rounded border border-secondary mb-3">
              <small className="text-info font-monospace fw-bold text-uppercase d-block mb-1">Отправитель:</small>
              <div>{formatAddress(getSenderObject(rec))}</div>
            </div>

            <div className="p-3 bg-body-tertiary rounded border border-secondary mb-3">
              <small className="text-info font-monospace fw-bold text-uppercase d-block mb-1">Получатель:</small>
              <div>{formatAddress(getRecipientObject(rec))}</div>
            </div>

            <div className="row g-2">
              <div className="col-6">
                <div className="p-2 bg-body-tertiary rounded border border-secondary text-center">
                  <small className="text-muted d-block mb-1">Вес груза</small>
                  <strong className="text-success">{getCargoWeightText(rec)}</strong>
                </div>
              </div>
              <div className="col-6">
                <div className="p-2 bg-body-tertiary rounded border border-secondary text-center">
                  <small className="text-muted d-block mb-1">Дата забора</small>
                  <strong>{getDateText(order.datePickup)}</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer border-secondary">
            <button
              type="button"
              className="btn btn-secondary btn-sm w-100"
              onClick={onClose}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
