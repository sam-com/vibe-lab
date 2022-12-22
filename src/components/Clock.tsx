import { createSignal, onCleanup } from "solid-js";

export function Clock() {
  const [time, setTime] = createSignal(new Date());

  const timer = setInterval(() => setTime(new Date()), 1000);
  onCleanup(() => clearInterval(timer));

  return (
    <h2 class="text-white text-3xl">
      {time().toLocaleTimeString(undefined, {
        timeStyle: "short",
        hour12: false,
      })}
    </h2>
  );
}
