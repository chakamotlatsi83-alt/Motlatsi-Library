import { useState } from "react";
import { useLibrary } from "../context/LibraryContext";

export default function BookForm() {
  const { addBook } = useLibrary();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [copies, setCopies] = useState(3);
  const [category, setCategory] = useState("General");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    addBook({ title, author, copies, total: copies, category });
    setTitle(""); setAuthor(""); setCopies(3);
  };

  return (
    <form onSubmit={submit} className="card form form--book">
      <h2>Add New Book</h2>
      <p className="sub small">Add to Maseru Library collection</p>
      
      <label>
        Title
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Things Fall Apart" required />
      </label>
      
      <label>
        Author
        <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="e.g. Chinua Achebe" required />
      </label>

      <div className="two">
        <label>
          Copies
          <input type="number" min="1" value={copies} onChange={e => setCopies(e.target.value)} />
        </label>
        <label>
          Category
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option>General</option>
            <option>Fiction</option>
            <option>Academic</option>
            <option>History</option>
            <option>Science</option>
          </select>
        </label>
      </div>

      <button className="btn" type="submit">Add Book</button>
    </form>
  );
}