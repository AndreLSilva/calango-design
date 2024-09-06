import type { MenuItems } from "../../../components/list-menu/ListMenu.types";
import type { ActionType } from "./actions.types";

export const actions: MenuItems<ActionType> = {
  export: {
    label: "Export",
  },
  reset: {
    label: "Reset",
  },
};
