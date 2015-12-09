export default function objectEach(object, callback) {
  for (const property in object) { // eslint-disable-line guard-for-in
    callback(property, object[property]);
  }
}
