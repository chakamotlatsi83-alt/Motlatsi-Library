import { useState } from "react";
import { useLibrary } from "../context/LibraryContext";

export default function Books() {
  const { books, addBook, updateBook, deleteBook, borrowBook, returnBook } = useLibrary();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", author: "", genre: "", isbn: "", quantity: 1 });

  const filtered = books.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.author) return alert("Title and Author required");
    if (editing) {
      updateBook(editing, { ...form, total: form.quantity });
      setEditing(null);
    } else {
      addBook(form);
    }
    setForm({ title: "", author: "", genre: "", isbn: "", quantity: 1 });
  };

  const startEdit = (b) => {
    setEditing(b.id);
    setForm({ title: b.title, author: b.author, genre: b.genre, isbn: b.isbn, quantity: b.quantity, total: b.total });
  };

  return (
    <div>
      <h1>Book Management</h1>
      <p className="sub">Add, update and delete books</p>

      <form onSubmit={handleSubmit} className="card form form--user">
        <h2>{editing ? "Update Book" : "Add New Book"}</h2>
        <div className="two">
          <label>Title<input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></label>
          <label>Author<input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required /></label>
        </div>
        <div className="two">
          <label>Genre<input value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} placeholder="Fiction / History" /></label>
          <label>ISBN<input value={form.isbn} onChange={e => setForm({ ...form, isbn: e.target.value })} /></label>
        </div>
        <label>Initial Quantity<input type="number" min="1" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} /></label>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" type="submit">{editing ? "Update" : "Add Book"}</button>
          {editing && <button type="button" className="btn ghost" onClick={() => { setEditing(null); setForm({ title: "", author: "", genre: "", isbn: "", quantity: 1 }); }}>Cancel</button>}
        </div>
      </form>

      <div style={{ margin: "16px 0" }}>
        <input className="search" placeholder="Search title or author..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="ledger-head"><h2>Editable Book List - {filtered.length}</h2></div>
      <div className="grid">
        {filtered.map(b => (
          <div key={b.id} className="card book" style={{ borderLeft: Number(b.quantity) < 2 ? "4px solid #ef4444" : "4px solid #22c55e" }}>
            <h3>{b.title}</h3>
            <p className="muted">{b.author} • {b.genre}</p>
            <p><small>{b.isbn}</small></p>
            <p><strong>{b.quantity}</strong> / {b.total} copies</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
              <button className="btn small" onClick={() => startEdit(b)}>Update</button>
              <button className="btn small ghost" onClick={() => { if (confirm("Delete this book?")) deleteBook(b.id); }}>Delete</button>
              <button className="btn small" onClick={() => borrowBook(b.id, "LIB-003")} disabled={Number(b.quantity) <= 0}>Borrow</button>
              <button className="btn small ghost" onClick={() => returnBook(b.id, "LIB-003")}>Return</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}