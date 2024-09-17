import { databaseName, designsStoreKey, getStore } from "../api.utils";
import type { DesignData } from "./designs.types";

export async function readDesign(id: string) {
  const store = await getStore(designsStoreKey, "readonly", databaseName);
  const request = store.get(id);

  return new Promise<DesignData>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
