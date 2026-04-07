import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

export const setItem = (key: string, value: string) => {
  storage.set(key, value);
};

export const getItem = (key: string): string | null => {
  return storage.getString(key) ?? null;
};

export const removeItem = (key: string) => {
  storage.remove(key);
};

export const clearStorage = () => {
  storage.clearAll();
};

export const getAllKeys = (): string[] => {
  return storage.getAllKeys();
};
