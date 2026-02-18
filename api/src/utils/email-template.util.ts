export function approvedTemplate(name: string, orderId: string) {
  return `
    <h2>Order Approved ✅</h2>
    <p>Halo ${name}</p>
    <p>Order ${orderId} sudah disetujui.</p>
  `;
}

export function rejectedTemplate(name: string, orderId: string) {
  return `
    <h2>Order Rejected ❌</h2>
    <p>Halo ${name}</p>
    <p>Order ${orderId} ditolak.</p>
    <p>Points & voucher dikembalikan.</p>
  `;
}
