import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// BOOKS
app.get("/books", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM books");
  res.json(rows);
});
app.post("/books", async (req, res) => {
  const { title, author, genre, isbn, quantity } = req.body;
  const id = Date.now().toString();
  await pool.query("INSERT INTO books VALUES (?,?,?,?,?,?,?)", [id, title, author, genre||'General', isbn||'N/A', Number(quantity), Number(quantity)]);
  res.json({ id });
});
app.put("/books/:id", async (req, res) => {
  const { title, author, genre, isbn, quantity, total } = req.body;
  await pool.query("UPDATE books SET title=?,author=?,genre=?,isbn=?,quantity=?,total=? WHERE id=?", [title, author, genre, isbn, quantity, total, req.params.id]);
  res.json({ success: true });
});
app.delete("/books/:id", async (req, res) => {
  await pool.query("DELETE FROM books WHERE id=?", [req.params.id]);
  res.json({ success: true });
});

// USERS
app.get("/users", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users");
  res.json(rows);
});
app.post("/users", async (req, res) => {
  try {
    const id = Date.now().toString();
    const { name, membershipId, role } = req.body;
    await pool.query("INSERT INTO users VALUES (?,?,?,?)", [id, name, membershipId, role]);
    res.json({ id });
  } catch (e) {
    res.status(400).json({ error: "Membership ID already exists" });
  }
});
app.put("/users/:id", async (req, res) => {
  const { name, membershipId, role } = req.body;
  await pool.query("UPDATE users SET name=?,membershipId=?,role=? WHERE id=?", [name, membershipId, role, req.params.id]);
  res.json({ success: true });
});
app.delete("/users/:id", async (req, res) => {
  await pool.query("DELETE FROM users WHERE id=?", [req.params.id]);
  res.json({ success: true });
});

// TRANSACTIONS
app.get("/transactions", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM transactions ORDER BY date DESC");
  res.json(rows);
});
app.post("/transactions", async (req, res) => {
  const { bookId, membershipId, type } = req.body;
  const id = Date.now().toString();
  const change = type === "borrow" ? -1 : 1;
  await pool.query("UPDATE books SET quantity = quantity + ? WHERE id=?", [change, bookId]);
  await pool.query("INSERT INTO transactions VALUES (?,?,?,?,?)", [id, bookId, membershipId, type, new Date()]);
  res.json({ id });
});

app.listen(5000, () => console.log("MySQL Backend running on http://localhost:5000"));