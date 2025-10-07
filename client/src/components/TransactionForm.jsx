import { useState } from "react";
import { api } from "../lib/axios";

export default function TransactionForm({ onAdded }) {
  const [form, setForm] = useState({
    type: "expense",
    amountMinor: "",
    category: "",
    date: new Date().toISOString().slice(0, 10),
    note: "",
  });

  async function submit(e){
    e.preventDefault();
    await api.post("/transactions", { ...form, amountMinor: Number(form.amountMinor) });
    setForm({ ...form, amountMinor: "", note: "" });
    onAdded?.();
  }

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold mb-3">Add Transaction</h2>
      <div className="grid grid-cols-2 gap-2">
        <select className="input" value={form.type} onChange={e=>setForm({ ...form, type: e.target.value })}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input className="input" type="number" placeholder="Amount (pence)"
               value={form.amountMinor} onChange={e=>setForm({ ...form, amountMinor: e.target.value })}/>
        <input className="input col-span-2" placeholder="Category"
               value={form.category} onChange={e=>setForm({ ...form, category: e.target.value })}/>
        <input className="input col-span-2" type="date"
               value={form.date} onChange={e=>setForm({ ...form, date: e.target.value })}/>
        <input className="input col-span-2" placeholder="Note (optional)"
               value={form.note} onChange={e=>setForm({ ...form, note: e.target.value })}/>
      </div>
      <button className="btn mt-3">Add</button>
    </form>
  );
}
