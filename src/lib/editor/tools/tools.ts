import type { MenuItems } from "../editor.types";
import type { ToolType } from "./tools.types";

export const tools: MenuItems<ToolType> = {
  symbols: {
    label: "Symbols",
    // shortcut: "",
  },
  eraser: {
    label: "Eraser",
    // shortcut: "e",
  },
};
