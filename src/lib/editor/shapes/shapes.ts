import type { MenuItems } from "../../../components/list-menu/ListMenu.types";
import type { ShapeType } from "./shapes.types";

export const shapes: MenuItems<ShapeType> = {
  brush: {
    label: "Brush",
    shortcut: "b",
  },
  eraser: {
    label: "Eraser",
    shortcut: "e",
  },
  line: {
    label: "Line",
    shortcut: "l",
  },
  rect: {
    label: "Rectangle",
    shortcut: "u",
    variants: ["■", "□"],
  },
  fill: {
    label: "Fill",
    shortcut: "g",
  },
  text: {
    label: "Text",
    shortcut: "t",
  },
};
