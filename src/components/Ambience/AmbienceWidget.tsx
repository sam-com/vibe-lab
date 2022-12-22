import { Component, createSignal } from "solid-js";
import { Ambience } from "../../api/Ambiences/Ambience";
import { Icon } from "../Icon";
import { AmbienceButton } from "./AmbienceButton";
import { AmbienceVolume } from "./AmbienceVolume";

const isBetween = (value: number, min: number, max: number) =>
  min <= value && value <= max;

export const AmbienceWidget: Component<{
  ambience: Ambience;
}> = ({ ambience }) => {
  const [isActive, setIsActive] = createSignal(false);
  const [volume, setVolume] = createSignal(ambience.getVolume());

  const toggleAmbience = () => {
    if (!isActive()) {
      ambience.play();
    } else {
      ambience.stop();
    }

    setIsActive((old) => !old);
  };

  const onVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    ambience.setVolume(newVolume);
  };

  return (
    <div class="relative w-[200px] h-[200px] flex justify-center items-center">
      <div class="absolute">
        <AmbienceVolume
          size={136}
          width={4}
          color={ambience.color}
          isActive={isActive()}
          onChange={onVolumeChange}
          value={volume()}
        >
          <AmbienceButton
            onToggleAmbience={toggleAmbience}
            ambience={ambience}
            isActive={isActive()}
          />
        </AmbienceVolume>
      </div>
    </div>
  );
};
