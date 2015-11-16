export function objectForEach(object, callback) {
  for (const property in object) {
    if (object.hasOwnProperty(property)) {
      callback(property, object[property]);
    }
  }
}
