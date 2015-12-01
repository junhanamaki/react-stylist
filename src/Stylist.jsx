import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Transition from './Transition.js';

const {
  Component,
  PropTypes: { string, number, node },
  Children: { count: countChildren },
} = React;

function grabValue(...args) {
  const { length } = args;

  for (let index = 0; index < length; ++index) {
    const value = args[index];

    if (value !== undefined && value !== null) { return value; }
  }

  return args[length - 1];
}

function buildConfig(name, props) {
  return [
    grabValue(props[`${name}Style`], props.style),
    grabValue(props[`${name}Easing`], props.easing),
    grabValue(props[`${name}Timeout`], props.timeout),
    grabValue(props[`${name}Interval`], props.interval),
  ];
}

export default class Stylist extends Component {
  static propTypes = {
    style: string, easing: string, timeout: number, interval: number,
    appearStyle: string, appearEasing: string, appearTimeout: number, appearInterval: number,
    enterStyle: string, enterSasing: string, enterTimeout: number, enterInterval: number,
    leaveStyle: string, leaveEasing: string, leaveTimeout: number, leaveInterval: number,
    disappearStyle: string, disappearEasing: string, disappearTimeout: number, disappearInterval: number,
    children: node,
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

  static getDefaultProps() {
    return {
      style: 'slide-left',
      easing: 'linear',
      timeout: 1000,
      interval: 200,
    };
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
