export interface Address {
  id: number;
  city: string;
  street: string;
  house: string;
  apartment?: string;
}

export interface Cargo {
  id: number;
  weight: number; // in kg
}

export interface Order {
  id: number;
  idSenderAddress: number;
  idRecipientAddress: number;
  idCargo: number;
  datePickup: string; // YYYY-MM-DD
  createdAt?: string;
}

export interface JoinedOrder {
  id: number;
  idSenderAddress?: number;
  idRecipientAddress?: number;
  idCargo?: number;
  senderAddress: Address;
  recipientAddress: Address;
  cargo: Cargo;
  datePickup: string;
  createdAt: string;
}

export interface CreateOrderPayload {
  sender: {
    city: string;
    street: string;
    house: string;
    apartment?: string;
  };
  recipient: {
    city: string;
    street: string;
    house: string;
    apartment?: string;
  };
  cargo: {
    weight: number;
  };
  datePickup: string;
}
