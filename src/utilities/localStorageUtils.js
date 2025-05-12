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

const getCurrentUserDataKey = () => 'current_user_data';

const getUserData = () => {
  const currentUserDataKey = getCurrentUserDataKey();
  const currentUserData = browserStorageGetItem(currentUserDataKey);
  return currentUserData ?? null;
};

const setUserData = (userData) => {
  const currentUserDataKey = getCurrentUserDataKey();
  browserStorageSetItem(currentUserDataKey, userData);
};

const removeUserData = () => {
  const currentUserDataKey = getCurrentUserDataKey();
  browserStorageRemoveItem(currentUserDataKey);
};

// NOSONAR - can be used in future for storing multiple users
// const getCurrentUserIdKey = () => {
//   return 'current_user_id';
// };
// const setCurrentUserId = (userId) => {
//   const currentUserKey = getCurrentUserIdKey();
//   browserStorageSetItem(currentUserKey, userId);
// };
// const getCurrentUserId = () => {
//   const currentUserKey = getCurrentUserIdKey();
//   const currentUserId = browserStorageGetItem(currentUserKey);
//   return currentUserId ?? null;
// };
// const getUserKey = (userId) => {
//   return `user_${userId}`;
// };
// const getUserData = (userId) => {
//   const id = userId ?? getCurrentUserId();
//   if (!id) return null;
//   const userKey = getUserKey(id);
//   const userData = browserStorageGetItem(userKey);
//   return userData;
// };
// const setUserData = (userId, data) => {
//   const userKey = getUserKey(userId);
//   browserStorageSetItem(userKey, data);
// };

export {
  browserStorageGetItem,
  browserStorageSetItem,
  browserStorageRemoveItem,
  getUserData,
  setUserData,
  removeUserData,
};
