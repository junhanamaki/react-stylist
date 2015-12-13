const registry = {};

export function register(name, style) {
  // TODO
  // - check for collision
  // - validate style

  registry[name] = style;
}

export function find(name) {
  return registry[name];
}
