import { Children } from 'react';
import Transition from './Transition.js';
import nonNull from './utils/nonNull.js';

const { count: countChildren } = Children;

export default class TransitionFactory {
  constructor(props) {
    this.props = props;
    this.count = countChildren(props.children);
  }

  buildTransitionParams(type) {
    const props = this.props;

    return [
      nonNull(props[`${type}Name`], props.name),
      nonNull(props[`${type}Easing`], props.easing),
      nonNull(props[`${type}Duration`], props.duration),
      nonNull(props[`${type}Interval`], props.interval),
      this.count,
    ];
  }

  build(type) {
    return new Transition(type, ...this.buildTransitionParams(type));
  }

  update(transition) {
    transition.update(...this.buildTransitionParams(transition.type));
  }
}
