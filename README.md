# Invoice-app

## 📌 Project Overview
This is a React-based Invoice Management Application that allows users to create, manage, and track invoices with different statuses (Draft, Pending, Paid). The app also includes filtering, dark mode, and persistent storage.

## 🚀 Live Demo
[Add your Vercel/Netlify link here]

## ⚙️ Features
- Create invoices
- Delete invoices
- Update invoice status (Draft → Pending → Paid)
- Filter invoices by status
- Dark mode toggle
- Persistent data using LocalStorage

## 🧱 Architecture
Built using:
- React (Vite)
- Functional components
- useState for state management
- useEffect for localStorage sync

### Structure:
- App.jsx → Main logic and UI
- State-driven UI updates
- LocalStorage for persistence

## ⚖️ Trade-offs
- No backend/database (uses LocalStorage instead)
- Simple UI instead of full design system
- Single-page structure instead of multi-route architecture

## ♿ Accessibility Notes
- Buttons are clearly labeled
- High contrast status indicators
- Keyboard-friendly interactions
- Simple and readable layout

## 🔧 Future Improvements
- Add backend (Node.js + database)
- Add invoice detail page (routing)
- Add edit invoice functionality
- Export invoices as PDF
- Improve mobile responsiveness
- Add authentication system
