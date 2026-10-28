import { useLibrary } from "../context/LibraryContext";

export default function Transactions() {
  const { transactions, books, users } = useLibrary();

  const getBook = (id) => books.find(b => b.id === id);
  const getUser = (mid) => users.find(u => u.membershipId === mid);

  return (
    <div>
      <h1>Transactions</h1>
      <p className="sub">Borrow and return history - {transactions.length} total</p>

      <div className="stats">
        <div className="card stat">
          <strong>{transactions.filter(t => t.type === "borrow").length}</strong>
          <span>Books Borrowed</span>
        </div>
        <div className="card stat">
          <strong>{transactions.filter(t => t.type === "return").length}</strong>
          <span>Books Returned</span>
        </div>
        <div className="card stat">
          <strong>{transactions.length}</strong>
          <span>Total Transactions</span>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Member</th>
              <th>Book</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice().reverse().map(tx => {
              const book = getBook(tx.bookId);
              const user = getUser(tx.membershipId);
              return (
                <tr key={tx.id}>
                  <td>{new Date(tx.date).toLocaleString()}</td>
                  <td>{user ? user.name : tx.membershipId} <code>{tx.membershipId}</code></td>
                  <td>{book ? book.title : tx.bookId}</td>
                  <td>
                    <span className={`tag ${tx.type === "borrow" ? "low" : "ok"}`}>
                      {tx.type}
                    </span>
                  </td>
                </tr>
              );
            })}
            {transactions.length === 0 && (
              <tr><td colSpan="4" className="center muted">No transactions yet. Borrow a book.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}