export default function TransactionList({ items=[] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold mb-3">Recent</h2>
      <ul className="divide-y">
        {items.map((x) => (
          <li key={x._id} className="py-2 flex justify-between">
            <div>
              <p className="text-sm">{x.category} — {x.note || "—"}</p>
              <small className="text-slate-500">{new Date(x.date).toLocaleDateString()}</small>
            </div>
            <div className={x.type==="expense" ? "text-brand-red" : "text-brand-success"}>
              {x.type==="expense" ? "-" : "+"}£{(x.amountMinor/100).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
