type Storage = typeof localStorage;

class StorageManager {
  storageKey: string = "";
  storage: Storage;

  constructor(storage: Storage, storageKey: string) {
    this.storageKey = storageKey;
    this.storage = storage;
  }

  isAvailable() {
    const testKey = "__TEST_KEY__";
    try {
      this.storage.setItem(testKey, testKey);
      this.storage.getItem(testKey);
      this.storage.removeItem(testKey);
      return true;
    } catch (e) {
      console.error("Provided storage is not avaible");
      return false;
    }
  }

  setItem<T>(key: string, value: T) {
    if (!this.isAvailable()) {
      return;
    }
    const prevValue = this.storage.getItem(this.storageKey);

    if (prevValue) {
      this.storage.setItem(
        this.storageKey,
        JSON.stringify({ ...JSON.parse(prevValue), [key]: value })
      );
    } else {
      this.storage.setItem(this.storageKey, JSON.stringify({ [key]: value }));
    }
  }

  getItem<T>(key: string): T | null {
    if (!this.isAvailable()) {
      return null;
    }

    const storageData = this.storage.getItem(this.storageKey);
    return storageData ? JSON.parse(storageData)[key] : null;
  }

  removeItem(key: string) {
    if (!this.isAvailable()) {
      return null;
    }

    const storageData = this.storage.getItem(this.storageKey);

    if (!storageData) {
      return null;
    }

    const { [key]: omit, ...newEnvValue } = JSON.parse(storageData);

    this.storage.setItem(this.storageKey, JSON.stringify(newEnvValue));

    return omit;
  }

  clear() {
    if (!this.isAvailable()) {
      return;
    }
    this.storage.clear();
  }
}

export default StorageManager;
