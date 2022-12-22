import { ToneAudioBuffersUrlMap } from "tone";
import { Ambience, AmbienceColor } from "./Ambience";

const rainTrack = "/src/assets/sounds/nature/rain.wav";

export class RainAmbience extends Ambience {
  constructor(urls: ToneAudioBuffersUrlMap) {
    super({
      icon: "water_drop",
      color: AmbienceColor.blue,
      urls,
    });
  }

  play(): void {
    const track = Object.keys(this.tracks)[0];
    this.players.player(track).start();
    this.players.player(track).loop = true;
  }

  stop(): void {
    this.players.stopAll();
  }
}

export const rain = new RainAmbience({ rainTrack });
