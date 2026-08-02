// Format currency to INR / USD or standard locale format
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format Date to standard readable format (e.g., "Jan 15, 2026")
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

// Format Date for HTML Input value (YYYY-MM-DD)
export const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

// Get initials from full name
export const getInitials = (firstName = "", lastName = "") => {
  const f = firstName ? firstName.charAt(0).toUpperCase() : "";
  const l = lastName ? lastName.charAt(0).toUpperCase() : "";
  return `${f}${l}` || "U";
};
