export function grabNonNull(...args) {
  const { length } = args;

  for (let index = 0; index < length; ++index) {
    const value = args[index];

    if (value !== undefined && value !== null) { return value; }
  }

  return args[length - 1];
}

export function objectForEach(object, callback) {
  for (const property in object) {
    if (object.hasOwnProperty(property)) {
      callback(property, object[property]);
    }
  }
}
