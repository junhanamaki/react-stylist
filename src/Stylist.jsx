import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import nonNull from './utils/nonNull.js';
import Transition from './utils/Transition.js';

const {
  Component,
  PropTypes: { string, number, node, any, bool },
  Children: { count: countChildren },
} = React;

function buildTransitionParams(name, props) {
  return [
    nonNull(props[`${name}Name`], props.name),
    nonNull(props[`${name}Easing`], props.easing),
    nonNull(props[`${name}Duration`], props.duration),
    nonNull(props[`${name}Interval`], props.interval),
  ];
}

export default class Stylist extends Component {
  static propTypes = {
    appearName: string,     // style to apply on mount, or when prop 'hide' changes to falsy
    appearEasing: string,   // easing for appear
    appearDuration: number, // duration of each appearing element animation
    appearInterval: number, // time to wait to apply style to appearing element

    enterName: string,      // style to apply to entering/added elements
    enterEasing: string,    // easing for enter
    enterDuration: number,  // duration of each entering element animation
    enterInterval: number,  // time to wait to apply style to entering element

    leaveName: string,      // style to apply to leaving/removed elements
    leaveEasing: string,    // easing for leave
    leaveDuration: number,  // duration of each leaving element animation
    leaveInterval: number,  // time to wait to apply style to leaving elements

    hideName: string,       // style to apply when prop 'hide' changes to truthy
    hideEasing: string,     // easing for hide
    hideDuration: number,   // duration of each hideing element animation
    hideInterval: number,   // time to wait to apply style to hideing elements

    name: string,           // default style to fallback to
    easing: string,         // default easing to fallback to
    duration: number,       // default duration to fallback to
    interval: number,       // default interval to fallback to

    component: any,         // component used to wrap elements
    children: node,         // elements to animate
    hide: bool,             // if true will apply hide style to all children
  };

  static defaultProps = {
    name: 'stylist-slide-to-left',
    easing: 'linear',
    duration: 500,
    interval: 200,
    hide: false,
  };

  constructor(...args) {
    super(...args);

    const props = args[0];
    const count = countChildren(props.children);

    this.transitionAppear = new Transition(...buildTransitionParams('appear', props), count);
    this.transitionEnter = new Transition(...buildTransitionParams('enter', props), count);
    this.transitionLeave = new Transition(...buildTransitionParams('leave', props), count);
    this.transitionHide = new Transition(...buildTransitionParams('hide', props), count);
  }

  componentWillReceiveProps(newProps) {
    const count = countChildren(newProps.children);

    this.transitionAppear.update(...buildTransitionParams('appear', newProps), count);
    this.transitionEnter.update(...buildTransitionParams('enter', newProps), count);
    this.transitionLeave.update(...buildTransitionParams('leave', newProps), count);
    this.transitionHide.update(...buildTransitionParams('hide', newProps), count);
  }

  componentWillUnmount() {
    this.transitionAppear.destroy();
    this.transitionEnter.destroy();
    this.transitionLeave.destroy();
    this.transitionHide.destroy();
  }

  render() {
    const {
      transitionAppear,
      transitionEnter,
      transitionLeave,
      transitionHide,
      props: { hide, children, ...transitionProps },
    } = this;

    const transitionName = {
      appear: transitionAppear.className,
      appearActive: transitionAppear.activeClassName,
      enter: transitionEnter.className,
      enterActive: transitionEnter.activeClassName,
      leave: transitionLeave.className,
      leaveActive: transitionLeave.activeClassName,
    };
    let transitionLeaveTimeout = transitionLeave.timeout;
    let items = children;

    if (hide) {
      Object.assign(transitionName, {
        leave: transitionHide.className,
        leaveActive: transitionHide.activeClassName,
      });
      transitionLeaveTimeout = transitionHide.timeout;
      items = null;
    }

    console.log(slideLeft); // eslint-disable-line

    return (
      <ReactCSSTransitionGroup
        {...transitionProps}
        transitionName={transitionName}
        transitionAppear={true}
        transitionAppearTimeout={transitionAppear.timeout}
        transitionEnterTimeout={transitionEnter.timeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
      >
        {items}
      </ReactCSSTransitionGroup>
    );
  }
}
