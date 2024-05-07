export function contrast(
  relativeLuminance1: number,
  relativeLuminance2: number,
) {
  return (
    (Math.max(relativeLuminance1, relativeLuminance2) + 0.05) /
    (Math.min(relativeLuminance1, relativeLuminance2) + 0.05)
  );
}
