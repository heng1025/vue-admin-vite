/**
 * Storage
 * data format:
 * {
 *   value: 'foo',
 *   expire: 1639129072692
 * }
 *
 */

const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

export class LocalCache {
  storage: Storage;
  constructor(storage = localStorage) {
    this.storage = storage;
  }
  get(key: string, def = null) {
    const item = this.storage.getItem(key);
    if (item) {
      try {
        const data = JSON.parse(item);
        const { value, expire } = data;
        if (expire === null || expire >= Date.now()) {
          return value;
        }
      } catch (err) {
        console.log(`store pass error: ${err}`);
      }
    }
    return def;
  }
  set(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
    const json = {
      value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
    };
    const stringData = JSON.stringify(json);
    this.storage.setItem(key, stringData);
  }
  remove(key: string) {
    this.storage.removeItem(key);
  }
  clear() {
    this.storage.clear();
  }
}
