function generateSKU(productName) {
    // نحول الاسم لحروف كبيرة
    const upperName = productName.toUpperCase();
  
    // نشيل أي مسافات أو رموز مش ضرورية
    const cleanName = upperName.replace(/[^A-Z0-9]/g, "");
  
    // ناخد أول 6 حروف أو أرقام من الاسم
    const namePart = cleanName.slice(0, 6);
  
    // نضيف رقم فريد عشان نمنع التكرار
    const uniquePart = Date.now().toString().slice(-4);
  
    return `${namePart}-${uniquePart}`;
  }
   
  // دالة التحقق من أن الـ SKU فريد
  export const isUniqueSKU = async (sku) => {
    const exists = await Product.findOne({ SKU: sku });
    return !exists; // true لو فريد، false لو مكرر
  };
  
  