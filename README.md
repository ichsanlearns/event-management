# 🎟️ Eventra – Production-Ready Event Management Platform

A fullstack event management system designed with real-world business logic, transactional integrity, and scalable architecture in mind.

This project goes beyond CRUD. It implements automated transaction lifecycles, seat restoration, referral rewards with expiration logic, and SQL-level data consistency handling.

---

## 🚀 Live Overview

Eventra allows:

• Organizers to create, manage, and promote events  
• Customers to browse, purchase tickets, use points/vouchers, and leave reviews  
• Automated transaction handling with rollback guarantees  
• Referral reward distribution with expiration tracking

All monetary values are handled in **IDR**.

---

# 🧱 Tech Stack

**Frontend**

- React
- TypeScript
- Responsive UI
- Debounced Search
- Protected Routes

**Backend**

- Node.js
- Express
- Prisma ORM
- PostgreSQL

**Architecture Highlights**

- JWT Authentication
- Role-Based Authorization
- SQL Transactions for multi-step state changes
- Automated expiration logic
- Unit-tested transaction flows
- Email notification integration

---

# 🧠 Why This Project Is Different

Most portfolio projects stop at CRUD.

Eventra implements:

✔ Multi-status transaction lifecycle  
✔ Automatic expiration (2-hour payment window)  
✔ 3-day organizer response window automation  
✔ Seat restoration on failure  
✔ Points & voucher rollback  
✔ Referral reward expiration (3 months logic)  
✔ Atomic database transactions

This simulates real financial-grade backend responsibility.

---

# 🎯 Core Business Logic

## 1️⃣ Transaction Lifecycle Engine

Each ticket purchase moves through 8 statuses:

- WAITING_FOR_PAYMENT
- WAITING_FOR_ADMIN_CONFIRMATION
- DONE
- PAID
- REVIEWED
- REJECTED
- EXPIRED
- CANCELED

### Automated Rules

• Payment proof must be uploaded within 2 hours  
• If not → status becomes EXPIRED  
• Organizer must respond within 3 days  
• If not → transaction auto-ACCEPTED

All state transitions that affect:

- Seats
- Points
- Vouchers

are wrapped inside SQL transactions to ensure atomicity.

---

## 2️⃣ Financial Integrity & Rollback

If a transaction fails (REJECTED / EXPIRED / CANCELED):

- Seats are restored
- Points are returned
- Vouchers are reactivated

This prevents data inconsistency and simulates real-world payment flow handling.

---

## 3️⃣ Referral & Reward System

• New users can register with a referral code  
• Referrer receives 10,000 points  
• New user receives discount coupon  
• Points expire after 3 months  
• Coupons expire after 3 months

Expiration logic is computed and enforced automatically.

---

## 4️⃣ Event System

Organizers can:

- Create free or paid events
- Set ticket types and seat limits
- Create event-specific vouchers
- View attendee lists
- Manage transactions
- Access dashboard statistics (year / month / day)

Customers can:

- Browse events
- Filter by category and location
- Search with debounce
- Use points to reduce payment
- Leave reviews after attending

---

# 🔐 Security & Access Control

• JWT-based authentication  
• Role-based page protection  
• Organizer-only dashboard  
• Customer-only purchase access  
• Immutable referral codes

---

# 🧪 Testing & Defensive Programming

This project includes:

- Defensive validation on critical state transitions
- Empty state handling for filters/search
- Confirmation dialogs before destructive actions
- SQL transactions for multi-table modifications
- Unit tests for transaction flows (added later)

---

# 📊 Engineering Decisions

### Why SQL Transactions?

To guarantee atomic updates when:

- Deducting seats
- Deducting points
- Applying vouchers
- Updating transaction status

Without transactions, race conditions would corrupt data.

### Why Debounce?

Prevents excessive API calls and improves performance during search.

### Why Status-Based Workflow?

Real-world systems operate on state machines, not booleans.

---

# 📦 Installation

```bash
git clone <your-repository-url>
npm install
npm run dev
```

---

# 🌍 Deployment

Frontend: Vercel  
Backend: Node.js + PostgreSQL

---

# 👨‍💻 About the Developer

Fullstack developer focused on backend integrity, transactional safety, and production-grade logic.

This project reflects readiness to handle real-world financial flows, role-based systems, and scalable database design.
