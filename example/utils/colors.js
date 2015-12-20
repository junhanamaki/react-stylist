const palette = [
  'red',
  'coral',
  'orange',
  'black',
  'gray',
  'purple',
  'blue',
  'green',
  'yellow',
  'pink',
  'violet',
];

const paletteSize = palette.length;

export default function pick() {
  return palette[Math.floor(Math.random() * paletteSize)];
}
