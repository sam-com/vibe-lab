export const polarToCartesian = ({
  angle,
  center,
  radius,
}: {
  angle: number;
  center: number;
  radius: number;
}) => {
  const a = ((angle - 90) * Math.PI) / 180.0;
  const x = center + radius * Math.cos(a);
  const y = center + radius * Math.sin(a);

  return { x, y };
};
