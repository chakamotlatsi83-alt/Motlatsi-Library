// How many books is considered low?
export const LOW_STOCK_LIMIT = 3;

// Format price: 100 -> M 100.00
export const money = (n) => `M ${Number(n || 0).toFixed(2)}`;

// Search helper: does "Harry" match "Harry Potter"?
export const matches = (text, query) => {
  if (!query) return true;
  return String(text).toLowerCase().includes(query.toLowerCase());
};

// Format date: 2024-01-01 -> Jan 1, 2024
export const formatDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString();
};