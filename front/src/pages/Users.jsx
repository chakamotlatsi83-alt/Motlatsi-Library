import { useState } from "react";
import { useLibrary } from "../context/LibraryContext";

export default function Users() {
  const { users, addUser, updateUser, deleteUser } = useLibrary();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", membershipId: "", role: "Student" });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.membershipId) return;
    if (editing) {
      updateUser(editing, form);
      setEditing(null);
    } else {
      addUser(form);
    }
    setForm({ name: "", membershipId: "", role: "Student" });
  };

  const startEdit = (u) => {
    setEditing(u.id);
    setForm({ name: u.name, membershipId: u.membershipId, role: u.role });
  };

  return (
    <div>
      <h1>User Management</h1>
      <p className="sub">Admin view - Add / Update / Delete users</p>

      <form onSubmit={submit} className="card form form--user">
        <h2>{editing ? "Update User" : "Add Member"}</h2>
        <div className="two">
          <label>Name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></label>
          <label>Membership ID<input value={form.membershipId} onChange={e => setForm({ ...form, membershipId: e.target.value })} required /></label>
        </div>
        <label>Role
          <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            <option>Student</option><option>Librarian</option><option>Admin</option>
          </select>
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" type="submit">{editing ? "Update" : "Add"}</button>
          {editing && <button type="button" className="btn ghost" onClick={() => setEditing(null)}>Cancel</button>}
        </div>
      </form>

      <div className="table-wrap" style={{ marginTop: 16 }}>
        <table>
          <thead><tr><th>Name</th><th>Membership ID</th><th>Role</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td><td><code>{u.membershipId}</code></td>
                <td><span className="tag ok">{u.role}</span></td>
                <td style={{ display: "flex", gap: 6 }}>
                  <button className="btn small" onClick={() => startEdit(u)}>Update</button>
                  <button className="btn small ghost" onClick={() => { if (confirm("Delete user?")) deleteUser(u.id); }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}