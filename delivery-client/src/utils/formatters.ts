type DynamicRecord = Record<string, unknown>;

export function getSenderObject(o: DynamicRecord | null | undefined): DynamicRecord | null {
  if (!o) return null;
  return (o.senderAddress || o.SenderAddress || o.idSenderAddressNavigation || o.IdSenderAddressNavigation || o.sender || o.Sender) as DynamicRecord | null;
}

export function getRecipientObject(o: DynamicRecord | null | undefined): DynamicRecord | null {
  if (!o) return null;
  return (o.recipientAddress || o.RecipientAddress || o.idRecipientAddressNavigation || o.IdRecipientAddressNavigation || o.recipient || o.Recipient) as DynamicRecord | null;
}

export function getCargoObject(o: DynamicRecord | null | undefined): DynamicRecord | null {
  if (!o) return null;
  return (o.cargo || o.Cargo || o.idCargoNavigation || o.IdCargoNavigation) as DynamicRecord | null;
}

export function formatAddress(obj: DynamicRecord | null | undefined): string {
  if (!obj) return '—';
  const city = obj.city ?? obj.City ?? '';
  const street = obj.street ?? obj.Street ?? '';
  const house = obj.house ?? obj.House ?? '';
  const apt = obj.apartment ?? obj.Apartment ?? '';

  const parts = [];
  if (city) parts.push(`г. ${city}`);
  if (street) parts.push(`ул. ${street}`);
  if (house) parts.push(`д. ${house}`);
  if (apt) parts.push(`кв. ${apt}`);

  return parts.length > 0 ? parts.join(', ') : '—';
}

export function getCargoWeightText(o: DynamicRecord | null | undefined): string {
  if (!o) return '—';
  const cargo = getCargoObject(o);
  if (!cargo) {
    const w = o.weight ?? o.Weight;
    return w !== undefined && w !== null ? `${w} кг` : '—';
  }
  const weight = cargo.weight ?? cargo.Weight;
  return weight !== undefined && weight !== null ? `${weight} кг` : '—';
}

export function getDateText(dateStr: string | undefined): string {
  if (!dateStr) return '—';
  return dateStr.split('T')[0];
}
