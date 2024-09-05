import type { MenuItems } from "../editor.types";
import type { ActionType } from "./actions.types";

export const actions: MenuItems<ActionType> = {
  export: {
    label: "Export",
  },
  reset: {
    label: "Reset",
  },
};
