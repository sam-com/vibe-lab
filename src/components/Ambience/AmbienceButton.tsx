import { Component } from "solid-js";
import { Ambience, AmbienceColor } from "../../api/Ambiences/Ambience";
import { Icon } from "../Icon";

const colorClassMapping = {
  white: "border-white",
  [AmbienceColor.blue]: "border-blue-500",
  [AmbienceColor.yellow]: "border-yellow-500",
  [AmbienceColor.red]: "border-red-500",
  [AmbienceColor.white]: "border-white",
};

interface AmbienceButtonProps {
  onToggleAmbience: () => void;
  isActive: boolean;
  ambience: Ambience;
}

export const AmbienceButton: Component<AmbienceButtonProps> = (props) => {
  return (
    <button
      class="w-full h-full rounded-full transition-colors duration-200 ease-in-out"
      classList={{ [colorClassMapping[props.ambience.color]]: props.isActive }}
      onClick={props.onToggleAmbience}
    >
      <div
        class="rounded-full aspect-square m-2 flex items-center justify-center"
        classList={{ "bg-white": props.isActive }}
      >
        <Icon
          name={props.ambience.icon}
          color={props.isActive ? props.ambience.color : AmbienceColor.white}
        />
      </div>
    </button>
  );
};
