import { ParentComponent } from "solid-js";
import { Clock } from "./Clock";

const AppHeaderLayout: ParentComponent = (props) => (
  <div class="w-full flex items-center justify-between p-4">
    {props.children}
  </div>
);

export function AppHeader() {
  return (
    <AppHeaderLayout>
      <div class="flex gap-2">
        <img src="/src/logo.svg" class="h-8" />
        <h2 class="text-white text-3xl">Vibe Lab</h2>
      </div>
      <Clock />
    </AppHeaderLayout>
  );
}
