import type { MenuItems } from "../../../components/list-menu/ListMenu.types";
import type { ShapeType } from "./shapes.types";

export const shapes: MenuItems<ShapeType> = {
  brush: {
    label: "Brush",
    // shortcut: "b",
  },
  line: {
    label: "Line",
    // shortcut: "l",
  },
  rect: {
    label: "Rectangle",
    // shortcut: "u",
    variants: ["■", "□"],
  },
  fill: {
    label: "Fill",
    // shortcut: "g",
  },
};
