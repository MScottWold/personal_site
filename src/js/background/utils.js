export function calcDist(x1, y1, x2, y2) {
  const sideSq1 = Math.pow(x1 - x2, 2);
  const sideSq2 = Math.pow(y1 - y2, 2);
  return Math.sqrt(sideSq1 + sideSq2);
}