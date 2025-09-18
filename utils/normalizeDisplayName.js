const normalizeDisplayName = (name) => {
  if (!name) return "";
  const trimmedName = name.trim();
  return trimmedName.length >= 2 && trimmedName.length <= 100
    ? trimmedName
    : "";
};

export default normalizeDisplayName;
