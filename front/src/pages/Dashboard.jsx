import { useLibrary } from "../context/LibraryContext";

export default function Dashboard() {
  const { books, users, transactions } = useLibrary();
  
  const lowStock = books.filter(b => Number(b.quantity) < 2);
  const totalAvailable = books.reduce((s, b) => s + Number(b.quantity), 0);

  return (
    <div>
      <h1>Dashboard</h1>
      <p className="sub">Current book availability overview</p>

      <div className="stats">
        <div className="card stat"><strong>{books.length}</strong><span>Total Titles</span></div>
        <div className="card stat"><strong>{totalAvailable}</strong><span>Copies Available</span></div>
        <div className="card stat"><strong>{users.length}</strong><span>Total Members</span></div>
        <div className="card stat" style={{ borderColor: lowStock.length ? "#ef4444" : "" }}>
          <strong style={{ color: lowStock.length ? "#ef4444" : "" }}>{lowStock.length}</strong>
          <span>Low Stock Alerts</span>
        </div>
      </div>

      <div className="ledger-head"><h2>Book Availability</h2></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Title</th><th>Author</th><th>Genre</th><th>Qty / Total</th><th>Status</th></tr></thead>
          <tbody>
            {books.map(b => {
              const low = Number(b.quantity) < 2;
              return (
                <tr key={b.id} style={{ background: low ? "#fef2f2" : "white" }}>
                  <td><strong>{b.title}</strong><br/><small className="muted">{b.isbn}</small></td>
                  <td>{b.author}</td>
                  <td>{b.genre}</td>
                  <td>{b.quantity} / {b.total}</td>
                  <td>{low ? <span className="tag low">Low Stock</span> : <span className="tag ok">In Stock</span>}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {lowStock.length > 0 && (
        <div className="card" style={{ marginTop: 16, borderLeft: "4px solid #ef4444" }}>
          <h3 style={{ color: "#ef4444" }}>Low Stock Warning</h3>
          <ul>{lowStock.map(b => <li key={b.id}>{b.title} - only {b.quantity} left</li>)}</ul>
        </div>
      )}
    </div>
  );
}