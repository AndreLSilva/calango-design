import { databaseName, designsStoreKey, getStore } from "../api.utils";
import type { DesignData } from "./designs.types";

export async function updateDesign(design: DesignData): Promise<void> {
  const store = await getStore(designsStoreKey, "readwrite", databaseName);
  const request = store.put(design, design.id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(undefined);
    request.onerror = () => reject(request.error);
  });
}
