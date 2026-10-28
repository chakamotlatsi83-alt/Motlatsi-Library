import { Navigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";

export default function ProtectedRoute({ children }) {
  const { user } = useLibrary();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}