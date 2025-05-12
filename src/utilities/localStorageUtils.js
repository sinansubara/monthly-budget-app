const browserStorageGetItem = (key) => {
  const item = window?.localStorage.getItem(key);
  if (item === null || item === 'undefined') {
    return null;
  }
  return JSON.parse(item);
};
const browserStorageSetItem = (key, value) => {
  const valueToStore =
    typeof value === 'string' ? value : JSON.stringify(value);
  window?.localStorage.setItem(key, valueToStore);
};
const browserStorageRemoveItem = (key) => {
  window?.localStorage.removeItem(key);
};

const getCurrentUserIdKey = () => {
  return 'current_user_id';
};

const getCurrentUserId = () => {
  const currentUserKey = getCurrentUserIdKey();
  const currentUserId = browserStorageGetItem(currentUserKey);
  return currentUserId ?? null;
};

const setCurrentUserId = (userId) => {
  const currentUserKey = getCurrentUserIdKey();
  browserStorageSetItem(currentUserKey, userId);
};

const getUserKey = (userId) => {
  return `user_${userId}`;
};

const getUserData = (userId) => {
  // implement logic for current user also here
  const id = userId ?? getCurrentUserId();
  if (!id) return null;
  const userKey = getUserKey(id);
  const userData = browserStorageGetItem(userKey);
  return userData;
};

const setUserData = (userId, data) => {
  const userKey = getUserKey(userId);
  browserStorageSetItem(userKey, data);
};

const removeCurrentUserId = () => {
  const currentUserKey = getCurrentUserIdKey();
  browserStorageRemoveItem(currentUserKey);
};

export {
  browserStorageGetItem,
  browserStorageSetItem,
  browserStorageRemoveItem,
  getCurrentUserId,
  setCurrentUserId,
  getUserData,
  setUserData,
  removeCurrentUserId,
};
