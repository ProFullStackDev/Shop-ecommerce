export const cleanObject = <T>(obj: T, checkEmptyString = false) => {
  return Object.keys(obj).reduce((acc, val) => {
    const value = obj[val];
    const validString = checkEmptyString && typeof value === 'string' ? value !== '' : true;
    if (value !== null && value !== undefined && validString) {
      if (Array.isArray(value)) {
        if (value.length) {
          acc[val] = value;
        }
        return acc;
      }
      if (typeof value === 'object') {
        const cleanObj = cleanObject(value, checkEmptyString);
        if (Object.keys(cleanObj).length) {
          acc[val] = cleanObj;
          return acc;
        }
        return acc;
      }
      acc[val] = value;
    }
    return acc;
  }, {});
};
