import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLibrary } from "../context/LibraryContext";

export default function Layout() {
  const { user, logout } = useLibrary();
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  // If no layout for login page, just show page
  if (window.location.pathname === "/login") {
    return <Outlet context={{ q }} />;
 git }

  return (
    <div className="shell">
      {/* SIDEBAR */}
      <aside className="side">
        <div className="brand">
          <span className="brand-mark">📚</span>
          <div className="brand-text">
            <strong>Maseru Library</strong>
            <span>Management System</span>
          </div>
        </div>

        <nav>
          <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Dashboard</NavLink>
          <NavLink to="/books" className={({isActive}) => isActive ? "active" : ""}>Books</NavLink>
          <NavLink to="/transactions" className={({isActive}) => isActive ? "active" : ""}>Transactions</NavLink>
          <NavLink to="/users" className={({isActive}) => isActive ? "active" : ""}> Users</NavLink>
        </nav>

        <div className="who">
          {user ? (
            <>
              <span>Signed in as <strong>{user.name}</strong> ({user.role})</span>
              <button className="link" onClick={() => { logout(); navigate("/login"); }}>Sign out</button>
            </>
          ) : (
            <NavLink to="/login" className="link">Sign in</NavLink>
          )}
        </div>
        <div className="hours">Open: Mon-Fri 8am-5pm</div>
      </aside>

      {/* MAIN AREA */}
      <div className="main">
        <div className="top">
          <div className="search-wrap">
            <span>🔍</span>
            <input placeholder="Search books, members..." value={q} onChange={e=>setQ(e.target.value)} />
          </div>
          <time>{new Date().toLocaleDateString()}</time>
        </div>
        <div className="page">
          <Outlet context={{ q }} />
        </div>
      </div>
    </div>
  );
}