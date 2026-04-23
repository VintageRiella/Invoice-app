import { useState, useEffect } from "react";

export default function App() {
  const [invoices, setInvoices] = useState(() => {
    try {
      const saved = localStorage.getItem("invoices");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  const createInvoice = () => {
    const newInvoice = {
      id: Date.now(),
      name: `Invoice ${invoices.length + 1}`,
      status: "draft",
    };
    setInvoices((prev) => [...prev, newInvoice]);
  };

  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const changeStatus = (id) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === id) {
          const newStatus =
            inv.status === "draft"
              ? "pending"
              : inv.status === "pending"
              ? "paid"
              : "draft";
          return { ...inv, status: newStatus };
        }
        return inv;
      })
    );
  };

  const getColor = (status) => {
    if (status === "paid") return "#16a34a";
    if (status === "pending") return "#f59e0b";
    return "#6b7280";
  };

  const theme = {
    background: darkMode ? "#0f172a" : "#f3f4f6",
    card: darkMode ? "#1e293b" : "#ffffff",
    text: darkMode ? "#ffffff" : "#111827",
    border: darkMode ? "#334155" : "#e5e7eb",
  };

  return (
    <div style={{ background: theme.background, minHeight: "100vh", padding: "20px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: theme.text }}>Invoice App 📄</h1>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>
      </div>

      {/* CREATE */}
      <button onClick={createInvoice} style={{ marginBottom: "15px" }}>
        Create Invoice
      </button>

      {/* FILTER TABS */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        {["all", "draft", "pending", "paid"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "8px 12px",
              borderRadius: "20px",
              border: "1px solid " + theme.border,
              background: filter === f ? "#3b82f6" : "transparent",
              color: filter === f ? "white" : theme.text,
              cursor: "pointer",
            }}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* LIST */}
      {invoices.length === 0 ? (
        <p style={{ color: theme.text }}>No invoices yet</p>
      ) : (
        invoices
          .filter((inv) => filter === "all" || inv.status === filter)
          .map((inv) => (
            <div
              key={inv.id}
              style={{
                background: theme.card,
                color: theme.text,
                padding: "15px",
                borderRadius: "12px",
                marginBottom: "10px",
                border: "1px solid " + theme.border,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* LEFT */}
              <div>
                <h3 style={{ margin: 0 }}>{inv.name}</h3>

                <span
                  style={{
                    display: "inline-block",
                    marginTop: "5px",
                    padding: "5px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    color: "white",
                    backgroundColor: getColor(inv.status),
                  }}
                >
                  {inv.status.toUpperCase()}
                </span>
              </div>

              {/* ACTIONS */}
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => changeStatus(inv.id)}>
                  Change Status
                </button>

                <button onClick={() => deleteInvoice(inv.id)} style={{ color: "red" }}>
                  Delete
                </button>
              </div>
            </div>
          ))
      )}
    </div>
  );
}