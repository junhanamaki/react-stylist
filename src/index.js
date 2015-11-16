import Stylist from './Stylist.jsx';
import StyleManager from './StyleManager.js';
import SlideStyle from './styles/Slide.css';

const Styles = [{
  name: 'slide',
  style: SlideStyle,
}];

const manager = new StyleManager(Styles);

export default Stylist;
export { manager as StyleManager };
