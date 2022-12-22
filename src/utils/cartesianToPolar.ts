interface CartesianToPolarProps {
  coordinates: { x: number; y: number };
  center: number;
}

export const cartesianToPolar = ({
  coordinates: { x, y },
  center,
}: CartesianToPolarProps) => {
  return Math.round(
    Math.atan((y - center) / (x - center)) / (Math.PI / 180) +
      (x >= center ? 90 : 270)
  );
};
