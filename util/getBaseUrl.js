// utils/getBaseUrl.js
export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // In the browser
    return "";
  }
  // On the server
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};
