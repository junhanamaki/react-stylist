const registry = {};

export function register(name, style) {
  // TODO
  // - check for collision
  // - validate if style has needed keys

  registry[name] = style;
}

export function find(name) {
  return registry[name];
}
