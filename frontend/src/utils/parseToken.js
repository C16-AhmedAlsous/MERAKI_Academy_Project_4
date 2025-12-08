export const parseToken = (token) => {
  try {
    if (!token) return null;
    const base64 = token.split(".")[1];
    if (!base64) return null;
    const normalized = base64.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + (4 - (normalized.length % 4)) % 4, "=");
    const payload = atob(padded);
    return JSON.parse(payload);
  } catch (err) {
    console.error("Unable to parse token", err);
    return null;
  }
};

