import { createContext, useContext, useState, useEffect } from "react";
const API = "http://localhost:5000";
const LibraryContext = createContext();

export function LibraryProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("maseru_user") || "null"));
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchAll = () => {
    fetch(`${API}/books`).then(r => r.json()).then(setBooks);
    fetch(`${API}/users`).then(r => r.json()).then(setUsers);
    fetch(`${API}/transactions`).then(r => r.json()).then(setTransactions);
  };
  useEffect(() => { fetchAll(); }, []);
  useEffect(() => { if (user) localStorage.setItem("maseru_user", JSON.stringify(user)); }, [user]);

  const login = (name, membershipId) => {
    const found = users.find(u => u.membershipId === membershipId);
    const logged = found || { name, membershipId, role: "Student" };
    setUser({ ...logged, name });
  };
  const logout = () => { setUser(null); localStorage.removeItem("maseru_user"); };

  const addUser = async (u) => {
    const res = await fetch(`${API}/users`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(u) });
    const data = await res.json(); if (!res.ok) { alert(data.error); return; } fetchAll();
  };
  const updateUser = async (id, u) => { await fetch(`${API}/users/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(u) }); fetchAll(); };
  const deleteUser = async (id) => { await fetch(`${API}/users/${id}`, { method: "DELETE" }); fetchAll(); };

  const addBook = async (b) => { await fetch(`${API}/books`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(b) }); fetchAll(); };
  const updateBook = async (id, b) => { await fetch(`${API}/books/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(b) }); fetchAll(); };
  const deleteBook = async (id) => { await fetch(`${API}/books/${id}`, { method: "DELETE" }); fetchAll(); };

  const borrowBook = async (bookId, membershipId) => { await fetch(`${API}/transactions`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ bookId, membershipId, type: "borrow" }) }); fetchAll(); };
  const returnBook = async (bookId, membershipId) => { await fetch(`${API}/transactions`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ bookId, membershipId, type: "return" }) }); fetchAll(); };

  return <LibraryContext.Provider value={{ user, users, books, transactions, login, logout, addUser, updateUser, deleteUser, addBook, updateBook, deleteBook, borrowBook, returnBook }}>{children}</LibraryContext.Provider>;
}
export const useLibrary = () => useContext(LibraryContext);