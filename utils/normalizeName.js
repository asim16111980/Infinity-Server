const normalizeName = (name,min=5,max=101) => {
  if (!name) return "";
  const trimmedName = name.trim();
  return trimmedName.length >= min && trimmedName.length <= max
    ? trimmedName
    : "";
};

export default normalizeName;
