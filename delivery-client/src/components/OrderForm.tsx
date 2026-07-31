import { useState, type FormEvent } from 'react';
import type { CreateOrderPayload } from '../types';

interface OrderFormProps {
  onSubmit: (payload: CreateOrderPayload) => Promise<void>;
  loading: boolean;
}

export function OrderForm({ onSubmit, loading }: OrderFormProps) {
  const [formData, setFormData] = useState<CreateOrderPayload>({
    sender: { city: '', street: '', house: '', apartment: '' },
    recipient: { city: '', street: '', house: '', apartment: '' },
    cargo: { weight: 1 },
    datePickup: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      sender: { city: '', street: '', house: '', apartment: '' },
      recipient: { city: '', street: '', house: '', apartment: '' },
      cargo: { weight: 1 },
      datePickup: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="card bg-dark text-light border-secondary shadow-sm">
      <div className="card-header bg-body-tertiary border-secondary py-3">
        <h5 className="card-title mb-0 h6 fw-bold">Новый заказ</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Отправитель */}
          <div className="mb-3">
            <h6 className="text-info small fw-bold text-uppercase mb-2">Отправитель</h6>
            <div className="mb-2">
              <input
                type="text"
                className="form-control form-control-sm bg-dark text-light border-secondary"
                placeholder="Город (напр. Москва)"
                required
                value={formData.sender.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sender: { ...formData.sender, city: e.target.value },
                  })
                }
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="form-control form-control-sm bg-dark text-light border-secondary"
                placeholder="Улица (напр. Тверская)"
                required
                value={formData.sender.street}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sender: { ...formData.sender, street: e.target.value },
                  })
                }
              />
            </div>
            <div className="row g-2">
              <div className="col-6">
                <input
                  type="text"
                  className="form-control form-control-sm bg-dark text-light border-secondary"
                  placeholder="Дом"
                  required
                  value={formData.sender.house}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sender: { ...formData.sender, house: e.target.value },
                    })
                  }
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control form-control-sm bg-dark text-light border-secondary"
                  placeholder="Квартира"
                  value={formData.sender.apartment || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sender: { ...formData.sender, apartment: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Получатель */}
          <div className="mb-3">
            <h6 className="text-info small fw-bold text-uppercase mb-2">Получатель</h6>
            <div className="mb-2">
              <input
                type="text"
                className="form-control form-control-sm bg-dark text-light border-secondary"
                placeholder="Город (напр. Санкт-Петербург)"
                required
                value={formData.recipient.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    recipient: { ...formData.recipient, city: e.target.value },
                  })
                }
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="form-control form-control-sm bg-dark text-light border-secondary"
                placeholder="Улица (напр. Невский)"
                required
                value={formData.recipient.street}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    recipient: { ...formData.recipient, street: e.target.value },
                  })
                }
              />
            </div>
            <div className="row g-2">
              <div className="col-6">
                <input
                  type="text"
                  className="form-control form-control-sm bg-dark text-light border-secondary"
                  placeholder="Дом"
                  required
                  value={formData.recipient.house}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      recipient: { ...formData.recipient, house: e.target.value },
                    })
                  }
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control form-control-sm bg-dark text-light border-secondary"
                  placeholder="Квартира"
                  value={formData.recipient.apartment || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      recipient: { ...formData.recipient, apartment: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Вес и дата */}
          <div className="row g-2 mb-3 pt-2 border-top border-secondary">
            <div className="col-6">
              <label className="form-label text-muted small mb-1">Вес (кг)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                className="form-control form-control-sm bg-dark text-light border-secondary"
                required
                value={formData.cargo.weight}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cargo: { weight: parseFloat(e.target.value) || 0 },
                  })
                }
              />
            </div>
            <div className="col-6">
              <label className="form-label text-muted small mb-1">Дата забора</label>
              <input
                type="date"
                className="form-control form-control-sm bg-dark text-light border-secondary"
                required
                value={formData.datePickup}
                onChange={(e) => setFormData({ ...formData, datePickup: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-success btn-sm w-100 fw-bold"
          >
            {loading ? 'Сохранение...' : 'Создать заказ'}
          </button>
        </form>
      </div>
    </div>
  );
}
