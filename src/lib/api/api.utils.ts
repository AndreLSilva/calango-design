export const databaseName = "calango";
export const designsStoreKey = "designs";

export function getStore(
  store: string,
  mode: IDBTransactionMode,
  database: string,
  version?: number
) {
  const request = indexedDB.open(database, version);

  return new Promise<IDBObjectStore>((resolve, reject) => {
    request.onupgradeneeded = () => {
      const db = request.result;
      resolve(db.createObjectStore(store));
    };
    request.onsuccess = () => {
      const db = request.result;
      resolve(db.transaction(store, mode).objectStore(store));
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
}
