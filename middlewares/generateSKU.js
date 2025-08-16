export function generateSKU(productNameKey = "productName") {
  return (req, res, next) => {
    const productName = req.body[productNameKey] || "";
    const upperName = productName.toUpperCase().trim() || "PROD";
    const cleanName = upperName.replace(/[^A-Z0-9]/g, "");
    const namePart = cleanName.slice(0, 6).padEnd(6, "X");
    const uniquePart = Math.floor(Math.random() * 9000 + 1000);
    const sku = `${namePart}-${uniquePart}-${Date.now()}`;

    req.generatedSKU = sku; 
    next();
  };
}
