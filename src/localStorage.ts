// localStorage can be unavailable (private mode, blocked storage). Reads then
// return null, so callers fall back to their defaults instead of crashing.
export const get = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const set =
  (key: string) =>
  (value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  };

const storage = { get, set };

export default storage;
