import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Transition from './Transition.js';

const { Children, Component, PropTypes } = React;
const { count: countChildren } = Children;

const defType = 'slide-left';
const defEasing = 'linear';
const defTimeout = 1000;
const defDelay = 200;

function grabValue(...args) {
  const { length } = args;

  for (let index = 0; index < length; ++index) {
    const value = args[index];

    if (value !== undefined && value !== null) { return value; }
  }

  return args[length - 1];
}

function buildConfig(name, props) {
  const Name = name.charAt(0).toUpperCase() + name.slice(1);

  const type = grabValue([props[`stylisy${Name}Type`], props.stylistType, defType]);
  const timeout = grabValue([props[`stylist${Name}Timeout`], props.stylistTimeout, defTimeout]);
  const easing = grabValue([props[`stylist${Name}Easing`], props.stylistEasing, defEasing]);
  const delay = grabValue([props[`stylist${Name}Delay`], props.stylistDelay, defDelay]);

  return [type, timeout, easing, delay];
}

export default class Stylist extends Component {
  static propTypes = {
    children: PropTypes.object,
  };

  constructor(...args) {
    super(...args);

    const props = args[0];
    const count = countChildren(props.children);

    this.transitionAppear = new Transition('appear', ...buildConfig('appear', props), count);
    this.transitionEnter = new Transition('enter', ...buildConfig('enter', props));
    this.transitionLeave = new Transition('leave', ...buildConfig('leave', props));
    this.transitionDisappear = new Transition('disappear', ...buildConfig('disappear', props), count);
  }

  componentWillReceiveProps(newProps) {
    const count = countChildren(newProps.children);

    this.transitionAppear.update(...buildConfig('appear', newProps), count);
    this.transitionEnter.update(...buildConfig('enter', newProps));
    this.transitionLeave.update(...buildConfig('leave', newProps));
    this.transitionDisappear.update(...buildConfig('disappear', newProps), count);
  }

  componentWillUnmount() {
    this.transitionAppear.destroy();
    this.transitionEnter.destroy();
    this.transitionLeave.destroy();
    this.transitionDisappear.destroy();
  }

  render() {
    return <ReactCSSTransitionGroup {...this.props} />;
  }
}
