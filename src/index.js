import { register } from './Registry.js';
import SlideLeft from './css/SlideLeft.css';

register('stylist.slide-left', SlideLeft);

export { register, find } from './Registry.js';

export { default as default } from './Stylist.jsx';
