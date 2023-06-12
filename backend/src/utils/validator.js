export const objectIsEmpty = (object) => {
  const objectKeysLength = Object.keys(object).length;
  if (objectKeysLength === 0) return true;
  else return false;
};

export const isNullOrEmpty = (attribute) => {
  if (attribute === null) return true;
  if (typeof attribute === "string" && attribute.trim() === "") return true;
  else return false;
};
