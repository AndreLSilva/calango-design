import { databaseName, designsStoreKey, getStore } from "../api.utils";
import type { DesignData } from "./designs.types";

export async function listDesigns() {
  const store = await getStore(designsStoreKey, "readonly", databaseName);
  const request = store.getAll();

  return new Promise<DesignData[]>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
