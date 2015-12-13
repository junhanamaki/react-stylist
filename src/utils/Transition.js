import StyleTag from './StyleTag.js';

const parentNode = document.getElementsByTagName('head')[0];

export default class Transition {
  constructor(className, easing, duration, interval, count) {
    this.className = className;
    this.easing = easing;
    this.duration = duration;
    this.interval = interval;
    this.count = count;

    this.styleTag = new StyleTag(`.${className}`, {
    }, { parentNode });
  }

  update(className, easing, duration, interval, count) {
    if (this.className === className
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
