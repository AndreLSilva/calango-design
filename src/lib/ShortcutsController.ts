type ShortcutCallback = () => void;
type GeneralCallback = (sequence: string) => void;

export class ShortcutsController {
  private static keysPressed: string[] = [];
  private static listeners: Record<string, ShortcutCallback[]> = {};
  private static generalListeners: GeneralCallback[] = [];

  public static init() {
    document.addEventListener("keydown", ShortcutsController.handleKeyDown);
    document.addEventListener("keyup", ShortcutsController.handleKeyUp);
  }

  public static destroy() {
    document.removeEventListener("keydown", ShortcutsController.handleKeyDown);
    document.removeEventListener("keyup", ShortcutsController.handleKeyUp);
  }

  public static addListener(callback: GeneralCallback) {
    if (ShortcutsController.generalListeners.includes(callback)) {
      throw new Error("Callback is already on listeners.");
    }
    ShortcutsController.generalListeners.push(callback);
  }

  public static removeListener(callback: GeneralCallback) {
    const callbackIndex = ShortcutsController.generalListeners.indexOf(callback);
    if (callbackIndex >= 0) {
      throw new Error("Callback not found on listeners.");
    }

    ShortcutsController.generalListeners.splice(callbackIndex, 1);
  }

  public static addShortcutListener(keys: string[], callback: ShortcutCallback) {
    const sequence = keys.join("+");

    if (sequence in ShortcutsController.listeners) {
      ShortcutsController.listeners[sequence].push(callback);
    } else {
      ShortcutsController.listeners[sequence] = [callback];
    }
  }

  public static removeShortcutListener(keys: string[], callback: ShortcutCallback) {
    const sequence = keys.join("+");

    if (!(sequence in ShortcutsController.listeners)) {
      throw new Error(`Sequence "${sequence}" not found on listeners.`);
    }

    const callbackIndex = ShortcutsController.listeners[sequence].indexOf(callback);
    if (callbackIndex < 0) throw new Error(`Callback not found on "${sequence}" sequence`);

    ShortcutsController.listeners[sequence].splice(callbackIndex, 1);
  }

  private static handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();

    if (!ShortcutsController.keysPressed.includes(event.key)) {
      ShortcutsController.keysPressed.push(event.key);
    }

    const sequence = ShortcutsController.keysPressed.join("+");

    // Call all general listeners.
    ShortcutsController.generalListeners.forEach((callback) => callback(sequence));

    // If the current key sequence has listeners attached to it, calls them and empties the keys pressed list.
    if (sequence in ShortcutsController.listeners) {
      ShortcutsController.listeners[sequence].forEach((callback) => callback());
      ShortcutsController.keysPressed = [];
    }
  }

  private static handleKeyUp({ key }: KeyboardEvent) {
    // Removes the released key from the keys pressed list.
    const keyIndex = ShortcutsController.keysPressed.indexOf(key);
    if (keyIndex >= 0) ShortcutsController.keysPressed.splice(keyIndex, 1);
  }
}
