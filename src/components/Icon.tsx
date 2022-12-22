import { AmbienceColor } from "../api/Ambiences/Ambience";

interface IconProps {
  name: string;
  color?: AmbienceColor;
}

const colorClassMapping = {
  [AmbienceColor.white]: "text-white",
  [AmbienceColor.blue]: "text-blue-500",
  [AmbienceColor.yellow]: "text-yellow-500",
  [AmbienceColor.red]: "text-red-500",
};

export function Icon(props: IconProps) {
  return (
    <span
      class={`material-icons text-6xl select-none ${
        colorClassMapping[props.color ?? AmbienceColor.white]
      }`}
    >
      {props.name}
    </span>
  );
}
