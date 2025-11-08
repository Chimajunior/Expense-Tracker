import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Insights from "../components/Insights";


export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0,7)); // YYYY-MM

  async function load() {
    const res = await api.get("/transactions",
      { params: { month, t: Date.now() } });
    setItems(res.data.items);
  }

  useEffect(() => { load(); }, [month]);

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <input type="month" className="input" value={month} onChange={e=>setMonth(e.target.value)} />
      </div>

      <SummaryCards items={items} />

      <div className="grid md:grid-cols-2 gap-6">
        <TransactionForm onAdded={load} />
        <TransactionList items={items} />
        <Insights items={items} />

      </div>
    </div>
  );
}
