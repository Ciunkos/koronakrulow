export const get = (key) => {
  const value = localStorage.getItem(key);
  return value;
};

export const set = (key) => (value) => {
  localStorage.setItem(key, value);
};

export default { get, set };
