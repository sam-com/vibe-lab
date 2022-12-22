import * as Tone from "tone";
import { Gain, PlayersOptions, ToneAudioBuffersUrlMap } from "tone";

const FADE_IN_OUT_DURATION = 0.5;

export enum AmbienceColor {
  blue = "#3C82F6",
  yellow = "#EBB305",
  red = "#EF4444",
  white = "#FFFFFF",
}

export class Ambience {
  gain: Tone.Gain;
  players: Tone.Players;
  tracks: ToneAudioBuffersUrlMap;
  icon: string;
  color: AmbienceColor;
  isOn: boolean;

  constructor({
    icon,
    color,
    urls,
    ...playerOptions
  }: Partial<PlayersOptions> & {
    icon: string;
    color: AmbienceColor;
    urls: ToneAudioBuffersUrlMap;
  }) {
    const gain = new Tone.Gain(0.75).toDestination();
    const panner = new Tone.Panner3D();
    panner.connect(gain);

    this.players = new Tone.Players({
      fadeIn: FADE_IN_OUT_DURATION,
      fadeOut: FADE_IN_OUT_DURATION,
      urls,
      ...playerOptions,
    }).connect(panner);

    this.gain = gain;
    this.isOn = false;
    this.tracks = urls;
    this.icon = icon;
    this.color = color;
  }

  setVolume(volume: number) {
    this.gain.gain.value = volume / 100;
  }

  getVolume() {
    return this.gain.gain.value * 100;
  }

  getPlayer(name: string) {
    return this.players.player(name);
  }

  play() {
    this.isOn = true;
  }

  stop() {
    this.isOn = false;
  }

  disconnect() {
    this.players.disconnect();
    this.gain.disconnect();
  }
}
