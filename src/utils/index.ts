export const formatPrice = (val?: number) => {
  if (!val) return 0;

  return val.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};
