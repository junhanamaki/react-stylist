import StyleTag from './StyleTag.js';

let uniqueId = 0;
function generateSelector() {
  return `stylist_transition_${++uniqueId}`;
}

const parentNode = document.getElementsByTagName('head')[0];

export default class Transition {
  constructor(type, timeout, easing, delay, count) {
    const confClassName = generateSelector();

    this.confClassName = confClassName;
    this.type = type;
    this.timeout = timeout;
    this.easing = easing;
    this.delay = delay;
    this.count = count;

    if (type) {
      this.styleTag = new StyleTag(`.${confClassName}`, null, { parentNode });
    }
  }

  update(type, timeout, easing, delay, count) {
    if (this.type === type
        && this.timeout === timeout
        && this.easing === easing
        && this.delay === delay
        && this.count === count) {
      return;
    }

    this.type = type;
    this.timeout = timeout;
    this.easing = easing;
    this.delay = delay;
    this.count = count;

    this.updateProps();
  }

  destroy() {
    const { styleTag } = this;

    if (styleTag) {
      styleTag.destroy();
      this.styleTag = null;
    }
  }

  getProps() {
    return this.props;
  }
}
