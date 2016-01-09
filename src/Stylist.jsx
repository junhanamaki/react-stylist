import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TransitionFactory from './TransitionFactory.js';

const {
  Component,
  PropTypes: { string, number, node, any, bool },
} = React;

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
    name: 'stylist.slide-left',
    easing: 'linear',
    duration: 500,
    interval: 200,
    hide: false,
  };

  constructor(...args) {
    super(...args);

    const transitionFactory = new TransitionFactory(args[0]);

    this.transitionAppear = transitionFactory.build('appear');
    this.transitionEnter = transitionFactory.build('enter');
    this.transitionLeave = transitionFactory.build('leave');
    this.transitionHide = transitionFactory.build('hide');
  }

  componentWillReceiveProps(newProps) {
    const transitionFactory = new TransitionFactory(newProps);

    transitionFactory.update(this.transitionAppear);
    transitionFactory.update(this.transitionEnter);
    transitionFactory.update(this.transitionLeave);
    transitionFactory.update(this.transitionHide);
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
      appear: transitionAppear.mainClassName,
      appearActive: transitionAppear.activeClassName,
      enter: transitionEnter.mainClassName,
      enterActive: transitionEnter.activeClassName,
      leave: transitionLeave.mainClassName,
      leaveActive: transitionLeave.activeClassName,
    };
    let transitionLeaveTimeout = transitionLeave.duration;
    let items = children;

    if (hide) {
      Object.assign(transitionName, {
        leave: transitionHide.mainClassName,
        leaveActive: transitionHide.activeClassName,
      });
      transitionLeaveTimeout = transitionHide.duration;
      items = null;
    }

    return (
      <ReactCSSTransitionGroup
        {...transitionProps}
        transitionName={transitionName}
        transitionAppear={true}
        transitionAppearTimeout={transitionAppear.duration}
        transitionEnterTimeout={transitionEnter.duration}
        transitionLeaveTimeout={transitionLeaveTimeout}
      >
        {items}
      </ReactCSSTransitionGroup>
    );
  }
}
