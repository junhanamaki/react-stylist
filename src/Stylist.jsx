import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Transition from './Transition.js';

const {
  Component,
  PropTypes: { string, number, node, any, bool },
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
    grabValue(props[`${name}Duration`], props.duration),
    grabValue(props[`${name}Interval`], props.interval),
  ];
}

export default class Stylist extends Component {
  static propTypes = {
    appearStyle: string,       // style to apply on mount, or when prop 'disappear' changes to falsy
    appearEasing: string,      // easing for appear
    appearDuration: number,    // duration of each appearing element animation
    appearInterval: number,    // time to wait to apply style to appearing element

    enterStyle: string,        // style to apply to entering/added elements
    enterEasing: string,       // easing for enter
    enterDuration: number,     // duration of each entering element animation
    enterInterval: number,     // time to wait to apply style to entering element

    leaveStyle: string,        // style to apply to leaving/removed elements
    leaveEasing: string,       // easing for leave
    leaveDuration: number,     // duration of each leaving element animation
    leaveInterval: number,     // time to wait to apply style to leaving elements

    disappearStyle: string,    // style to apply when prop 'disappear' changes to truthy
    disappearEasing: string,   // easing for disappear
    disappearDuration: number, // duration of each disappeating element animation
    disappearInterval: number, // time to wait to apply style to disappearing elements

    style: string,             // default style to fallback to
    easing: string,            // default easing to fallback to
    duration: number,          // default duration to fallback to
    interval: number,          // default interval to fallback to

    component: any,            // component used to wrap elements
    children: node,            // elements to animate
    disappear: bool,           // if true will apply disappear style to all children
  };

  static defaultProps = {
    style: 'slide-left',
    easing: 'linear',
    duration: 500,
    interval: 200,
    disappear: false,
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
    const {
      transitionAppear,
      transitionEnter,
      transitionLeave,
      transitionDisappear,
      props: { disappear, children, ...propsForReactCSSTransitionGroup },
    } = this;

    const transitionName = {
      appear: transitionAppear.name,
      appearActive: transitionAppear.name,
    };
    let transitionLeaveTimeout;
    let items;
    if (disappear) {
      transitionLeaveTimeout = transitionDisappear.timeout;
    } else {
      transitionLeaveTimeout = transitionLeave.timeout;
      items = children;
    }

    return (
      <ReactCSSTransitionGroup
        transitionName={transitionName}
        transitionAppear={true}
        transitionAppearTimeout={transitionAppear.timeout}
        transitionEnterTimeout={transitionEnter.timeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
        {...propsForReactCSSTransitionGroup}
      >
        {items}
      </ReactCSSTransitionGroup>
    );
  }
}
