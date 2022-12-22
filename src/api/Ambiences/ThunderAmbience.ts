import { ToneAudioBuffersUrlMap } from "tone";
import { wait } from "../../utils/wait";
import { Ambience, AmbienceColor } from "./Ambience";

import thunderTrack from "/src/assets/sounds/nature/thunder_rumble.wav";

export class ThunderAmbience extends Ambience {
  constructor(urls: ToneAudioBuffersUrlMap) {
    super({
      color: AmbienceColor.yellow,
      icon: "electric_bolt",
      urls,
    });
  }

  play(): void {
    super.play();
    const trackKeys = Object.keys(this.tracks);
    const track = trackKeys[Math.floor(Math.random() * (trackKeys.length - 1))];
    const player = this.players.player(track).start();

    player.onstop = () => {
      if (this.isOn) wait(10000).then(() => this.play());
    };
  }

  stop(): void {
    super.stop();
    this.players.stopAll();
  }
}

export const thunder = new ThunderAmbience({ thunderTrack });
