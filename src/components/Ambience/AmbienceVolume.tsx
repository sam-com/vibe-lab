import {
  Component,
  createSignal,
  JSXElement,
  onCleanup,
  onMount,
  ParentProps,
} from "solid-js";

import { AmbienceColor } from "../../api/Ambiences/Ambience";
import { cartesianToPolar } from "../../utils/cartesianToPolar";
import { polarToCartesian } from "../../utils/polarToCartesian";

interface AmbienceVolumeProps {
  color: AmbienceColor;
  children?: JSXElement;
  isActive: boolean;
  knobSize?: number;
  onChange: (volume: number) => void;
  size?: number;
  value: number;
  width?: number;
}

interface VolumeRingProps {
  volume: number;
  color: AmbienceColor;
  center: number;
  radius: number;
  width: number;
}

type VolumeKnobProps = VolumeRingProps & {
  knobSize: number;
  onGrab: () => void;
};

const transformPolarToPercent = (polar: number) => (polar * 100) / 360;
const transformPercentToPolar = (percent: number) =>
  (Math.min(99.99, percent) * 360) / 100;

const EmptyRing: Component<VolumeRingProps> = (props) => (
  <circle
    cx={props.center}
    cy={props.center}
    r={props.radius}
    stroke={props.color}
    stroke-width={props.width}
    stroke-opacity={0.4}
    fill="none"
  />
);

const VolumeRing: Component<VolumeRingProps> = (props) => {
  const startCoord = () =>
    polarToCartesian({ angle: 0, center: props.center, radius: props.radius });
  const endCoord = () =>
    polarToCartesian({
      angle: props.volume,
      radius: props.radius,
      center: props.center,
    });

  return (
    <path
      stroke={props.color}
      stroke-width={props.width + 1}
      fill="none"
      d={`M${startCoord().x} ${startCoord().y} A ${props.radius} ${
        props.radius
      } 0 ${props.volume > 180 ? 1 : 0} 1 ${endCoord().x} ${endCoord().y}`}
    />
  );
};

const VolumeKnob: Component<VolumeKnobProps> = (props) => {
  const endCoord = () =>
    polarToCartesian({
      angle: props.volume,
      radius: props.radius,
      center: props.center,
    });

  return (
    <circle
      cx={endCoord().x}
      cy={endCoord().y}
      cursor="grab"
      r={props.knobSize}
      fill={props.color}
      onpointerdown={props.onGrab}
    />
  );
};

const VolumeButtonContainer: Component<ParentProps> = (props) => (
  <div class="flex items-center justify-center h-full w-full p-3">
    {props.children}
  </div>
);

export const AmbienceVolume: Component<AmbienceVolumeProps> = (props) => {
  const { onChange, knobSize = 12, size = 200, width = 6 } = props;

  const [isGrabbed, setIsGrabbed] = createSignal(false);
  let volumeContainerRef: any;
  const volume = () => transformPercentToPolar(props.value);
  const color = () => (props.isActive ? props.color : AmbienceColor.white);
  const radius = (size / 2) * 0.8;
  const center = size / 2;

  const getRingProps = () => ({
    radius,
    color: color(),
    center,
    volume: volume(),
    width,
  });

  const volumeKnobListener = (e: PointerEvent) => {
    if (!isGrabbed()) return;

    const base = volumeContainerRef?.getBoundingClientRect();
    if (!base) return;

    const x = e.clientX - base.left;
    const y = e.clientY - base.top;

    const polarOldValue = volume();
    const polarNewValue = cartesianToPolar({
      coordinates: { x, y },
      center,
    });
    const polarDeltaValue = polarNewValue - polarOldValue;

    let n = Math.min(polarNewValue, 359.99);

    if (Math.abs(polarDeltaValue) > 180) {
      if (polarDeltaValue > 0) {
        n = 0;
      } else {
        n = 359.99;
      }
    }

    if (n === polarOldValue) return;
    onChange(transformPolarToPercent(n));
  };

  const releaseVolumeKnobListener = () =>
    isGrabbed() ? setIsGrabbed(false) : undefined;

  const handleGrabVolumeKnob = () => setIsGrabbed(true);

  onMount(() => {
    document.addEventListener("pointermove", volumeKnobListener);
    document.addEventListener("pointerup", releaseVolumeKnobListener);
  });
  onCleanup(() => {
    document.removeEventListener("pointermove", volumeKnobListener);
    document.removeEventListener("pointerup", releaseVolumeKnobListener);
  });

  return (
    <svg width={size} height={size} ref={volumeContainerRef}>
      <EmptyRing {...getRingProps()} />

      <foreignObject height={size} width={size}>
        <VolumeButtonContainer>{props.children}</VolumeButtonContainer>
      </foreignObject>

      <VolumeRing {...getRingProps()} />

      <VolumeKnob
        {...getRingProps()}
        knobSize={knobSize}
        onGrab={handleGrabVolumeKnob}
      />
    </svg>
  );
};
