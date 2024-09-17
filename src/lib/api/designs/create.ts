import { charMultiply } from "$lib/utils/string.utils";
import { v4 as uuid } from "uuid";
import { databaseName, designsStoreKey, getStore } from "../api.utils";
import type { DesignData } from "./designs.types";

export async function createDesign(width: number, height: number) {
  const newDesign: DesignData = {
    id: uuid(),
    path: "",
    name: "New Design",
    content: "",
  };

  // Build default content
  const contentLines = charMultiply(" ", width);
  newDesign.content += contentLines;
  for (let y = 1; y < height; y++) {
    newDesign.content += `\n${contentLines}`;
  }

  // Saves new design to the database.
  const store = await getStore(designsStoreKey, "readwrite", databaseName);
  const request = store.add(newDesign, newDesign.id);

  return new Promise<DesignData>((resolve, reject) => {
    request.onsuccess = () => resolve(newDesign);
    request.onerror = () => reject(request.error);
  });
}
