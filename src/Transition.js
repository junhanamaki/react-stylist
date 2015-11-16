import StyleTag from './StyleTag.js';

let uniqueId = 0;
function generateUniqueName() {
  return `stylist_transition_${++uniqueId}`;
}

const parentNode = document.getElementsByTagName('head')[0];

export default class Transition {
  constructor(type, timeout, easing, delay, count) {
    const confClassName = generateUniqueName();
    const props = {};

    this.confClassName = confClassName;
    this.type = type;
    this.timeout = timeout;
    this.easing = easing;
    this.delay = delay;
    this.count = count;
    this.props = props;

    if (type) {
      this.styleTag = new StyleTag(`.${confClassName}`, null, { parentNode });
    } else {
      this.destroy();
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
    this.destroyStyleTag();
  }

  destroyStyleTag() {
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
