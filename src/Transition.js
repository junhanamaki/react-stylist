import { find } from './Registry.js';
import StyleTag from './StyleTag.js';

const parentNode = document.getElementsByTagName('head')[0];

export default class Transition {
  constructor(type, name, easing, duration, interval, count) {
    const style = find(name);
    if (!style) {
      // TODO: raise error!
    }

    const activeClassName = style[`${type}-active`];
    const activeStyle = {
      transition: `transform ${duration}ms ${easing}`,
      'animation-duration': `${duration}ms`,
      'animation-timing-function': easing,
    };

    this.styleTagActive = new StyleTag(`.${activeClassName}`, activeStyle, { parentNode });
    this.mainClassName = style[type];
    this.activeClassName = activeClassName;
    this.type = type;
    this.name = name;
    this.easing = easing;
    this.duration = duration;
    this.interval = interval;
    this.count = count;
  }

  update(name, easing, duration, interval, count) {
    if (this.name === name
        && this.easing === easing
        && this.duration === duration
        && this.interval === interval
        && this.count === count) {
      return;
    }
  }

  destroy() {
    const { styleTag } = this;

    if (styleTag) {
      styleTag.destroy();
      this.styleTag = null;
    }
  }
}
