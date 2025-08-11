import Product from "../models/product.model.js";

export function generateSKU(productName = "") {
  const upperName = productName.toUpperCase().trim() || "PROD";
  const cleanName = upperName.replace(/[^A-Z0-9]/g, "");
  const namePart = cleanName.slice(0, 6).padEnd(6, "X");
  const uniquePart = Math.floor(Math.random() * 9000 + 1000);
  return `${namePart}-${uniquePart}`;
}

export const isUniqueSKU = async (sku) => {
  const exists = await Product.exists({ SKU: sku });
  return !exists;
};
