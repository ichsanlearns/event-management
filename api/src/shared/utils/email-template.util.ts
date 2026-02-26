function baseLayout(title: string, content: string) {
  return `
  <div style="font-family: Arial, sans-serif; background:#f6f7fb; padding:24px">
    <div style="max-width:600px;margin:auto;background:white;border-radius:12px;padding:24px;border:1px solid #eee">
      
      <h2 style="margin:0 0 16px 0;color:#1e293b">
        🎟️ Event Ticket System
      </h2>

      ${content}

      <hr style="margin:24px 0;border:none;border-top:1px solid #eee" />

      <p style="font-size:12px;color:#64748b">
        Email ini dikirim otomatis oleh sistem. Mohon tidak membalas email ini.
      </p>

    </div>
  </div>
  `;
}

export function approvedTemplate(name: string, orderCode: string, eventName?: string, qty?: number, total?: number) {
  const content = `
    <h3 style="color:#16a34a;margin-bottom:8px">Pembayaran Disetujui ✅</h3>

    <p>Halo <b>${name}</b>,</p>

    <p>Transaksi kamu telah berhasil dikonfirmasi oleh organizer.</p>

    <div style="background:#f0fdf4;border:1px solid #bbf7d0;padding:16px;border-radius:8px;margin:16px 0">
      <p><b>Kode Order:</b> ${orderCode}</p>
      ${eventName ? `<p><b>Event:</b> ${eventName}</p>` : ""}
      ${qty ? `<p><b>Jumlah Tiket:</b> ${qty}</p>` : ""}
      ${total ? `<p><b>Total:</b> Rp ${total.toLocaleString()}</p>` : ""}
    </div>

    <p>Silakan datang sesuai jadwal event. Tunjukkan bukti order saat masuk.</p>

    <p style="margin-top:20px">
      Terima kasih 🙏
    </p>
  `;

  return baseLayout("Order Approved", content);
}

export function rejectedTemplate(name: string, orderCode: string, eventName?: string) {
  const content = `
    <h3 style="color:#dc2626;margin-bottom:8px">Pembayaran Ditolak ❌</h3>

    <p>Halo <b>${name}</b>,</p>

    <p>Maaf, transaksi berikut tidak dapat dikonfirmasi:</p>

    <div style="background:#fef2f2;border:1px solid #fecaca;padding:16px;border-radius:8px;margin:16px 0">
      <p><b>Kode Order:</b> ${orderCode}</p>
      ${eventName ? `<p><b>Event:</b> ${eventName}</p>` : ""}
    </div>

    <p><b>Yang sudah kami kembalikan:</b></p>

    <ul>
      <li>✅ Seat dikembalikan</li>
      <li>✅ Voucher dikembalikan (jika digunakan)</li>
      <li>✅ Point dikembalikan (jika digunakan)</li>
    </ul>

    <p>Silakan lakukan transaksi ulang dengan bukti pembayaran yang valid.</p>

    <p style="margin-top:20px">
      Terima kasih 🙏
    </p>
  `;

  return baseLayout("Order Rejected", content);
}
