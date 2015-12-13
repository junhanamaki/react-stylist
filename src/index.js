import { register } from './Registry.js';
import SlideLeft from 'style-loader!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]!./css/SlideLeft.css';

register('stylist.slide-left', SlideLeft);

export { register, find } from './Registry.js';

export { default as default } from './Stylist.jsx';
