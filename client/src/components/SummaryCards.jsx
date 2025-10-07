export default function SummaryCards({ items=[] }) {
    const income = items.filter(x=>x.type==="income").reduce((s,x)=>s+x.amountMinor,0);
    const expense = items.filter(x=>x.type==="expense").reduce((s,x)=>s+x.amountMinor,0);
    const balanceMinor = income - expense;
  
    function toGBP(minor){ return `£${(minor/100).toFixed(2)}` }
  
    return (
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-sm text-slate-500">Income</p>
          <p className="text-xl font-semibold text-brand-success">{toGBP(income)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-sm text-slate-500">Expense</p>
          <p className="text-xl font-semibold text-brand-red">{toGBP(expense)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-sm text-slate-500">Balance</p>
          <p className={`text-xl font-semibold ${balanceMinor<0?'text-brand-red':'text-brand-ink'}`}>{toGBP(balanceMinor)}</p>
        </div>
      </div>
    );
  }
  