import * as Tone from "tone";
import { Ambience, AmbienceColor } from "./Ambience";

import moto1Track from "/src/assets/sounds/city/moto_1.wav";
import car1Track from "/src/assets/sounds/city/car_1.wav";
import car2Track from "/src/assets/sounds/city/car_2.wav";
import car3Track from "/src/assets/sounds/city/car_3.wav";
import { ToneAudioBuffersUrlMap } from "tone";
import { wait } from "../../utils/wait";

export class SlowTrafficAmbience extends Ambience {
  constructor(urls: ToneAudioBuffersUrlMap) {
    super({
      color: AmbienceColor.red,
      icon: "directions_car",
      urls,
    });
  }

  play(): void {
    super.play();
    const trackKeys = Object.keys(this.tracks);
    const track = trackKeys[Math.floor(Math.random() * (trackKeys.length - 1))];
    const player = this.players.player(track).start();

    player.onstop = () => {
      if (this.isOn) wait(5000).then(() => this.play());
    };
  }

  stop(): void {
    super.stop();
    this.players.stopAll();
  }
}

export const slowTraffic = new SlowTrafficAmbience({
  moto1Track,
  car1Track,
  car2Track,
  car3Track,
});
