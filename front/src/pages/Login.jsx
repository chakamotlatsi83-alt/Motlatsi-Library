import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";

export default function Login() {
  const { login } = useLibrary();
  const [name, setName] = useState("Motlatsi Chaka");
  const [membershipId, setMembershipId] = useState("LIB-001");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !membershipId.trim()) {
      setError("Enter name and membership ID");
      return;
    }
    login(name, membershipId);
    navigate("/");
  };

  return (
    <div className="login-wrap">
      <form className="card login-card" onSubmit={handleSubmit}>
        <div className="panel-head">
          <h2>📚 Maseru Library</h2>
          <p className="sub">Sign in to Management System</p>
        </div>

        {error && <div className="notice error">{error}</div>}

        <label>
          Name
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
        </label>

        <label>
          Membership ID
          <input value={membershipId} onChange={e => setMembershipId(e.target.value)} placeholder="LIB-001" />
        </label>

        <button className="btn" type="submit">Sign In</button>

        <div className="demo">
          <p className="small center muted">Demo accounts - click to fill</p>
          <div className="actions">
            <button type="button" className="btn sm ghost" onClick={() => { setName("Motlatsi Chaka"); setMembershipId("LIB-001"); }}>Admin LIB-001</button>
            <button type="button" className="btn sm ghost" onClick={() => { setName("Teboho Lerato"); setMembershipId("LIB-002"); }}>Librarian LIB-002</button>
            <button type="button" className="btn sm ghost" onClick={() => { setName("Palesa Mokoena"); setMembershipId("LIB-003"); }}>Student LIB-003</button>
          </div>
        </div>
      </form>
    </div>
  );
}