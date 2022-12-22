import { Component, onCleanup, ParentComponent } from "solid-js";
import * as Tone from "tone";
import { AppHeader } from "./components/AppHeader";
import { rain } from "./api/Ambiences/RainAmbience";
import { Ambience } from "./api/Ambiences/Ambience";
import { thunder } from "./api/Ambiences/ThunderAmbience";
import { AmbienceWidget } from "./components/Ambience/AmbienceWidget";
import { slowTraffic } from "./api/Ambiences/SlowTrafficAmbience";

const AmbiencesLayout: ParentComponent = (props) => (
  <div class="flex flex-col gap-8 m-4 justify-center items-center">
    {props.children}
  </div>
);

const AmbienceCategoryLayout: ParentComponent<{ name: string }> = (props) => (
  <div>
    <h2 class=" text-3xl text-white pb-4">{props.name}</h2>
    <div class="flex gap-8">{props.children}</div>
  </div>
);

const AppLayout: ParentComponent = (props) => (
  <div class="h-screen w-screen  overflow-hidden flex flex-col bg-gradient-to-b from-[#173965] to-gray-900 ">
    {props.children}
  </div>
);

const App: Component = () => {
  const ambiences = [thunder, rain, slowTraffic];

  onCleanup(() => ambiences.forEach((ambience) => ambience.disconnect()));

  return (
    <AppLayout>
      <AppHeader />
      <AmbiencesLayout>
        <AmbienceCategoryLayout name="Base">
          {ambiences.map((ambience) => (
            <AmbienceWidget ambience={ambience} />
          ))}
        </AmbienceCategoryLayout>
      </AmbiencesLayout>
    </AppLayout>
  );
};

export default App;
