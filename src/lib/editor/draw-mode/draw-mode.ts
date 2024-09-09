import type { MenuItems } from "../../../components/list-menu/ListMenu.types";
import type { DrawModeType } from "./draw-mode.types";

export const drawModes: MenuItems<DrawModeType> = {
  symbols: { label: "Symbols" },
  style: { label: "Styles" },
  both: { label: "Both" },
};
