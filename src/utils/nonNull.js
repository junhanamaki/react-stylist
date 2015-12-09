export default function nonNull(...args) {
  const { length } = args;

  for (let index = 0; index < length; ++index) {
    const value = args[index];

    if (value !== undefined && value !== null) { return value; }
  }

  return args[length - 1];
}
