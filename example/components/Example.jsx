import React from 'react';
import Stylist from '../../src/index.js';
import pickColor from '../utils/colors.js';

function getInitialState() {
  return { seed: 0, hide: false, items: [] };
}

export default class Example extends React.Component {
  constructor() {
    super();

    this.addItem = this.addItem.bind(this);
    this.toggle = this.toggle.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.reset = this.reset.bind(this);

    this.state = getInitialState();
  }

  addItem() {
    const { state: { seed, items } } = this;
    const id = seed + 1;

    items.push({ id, color: pickColor() });

    this.setState({ items, seed: id });
  }

  removeItem(id) {
    const items = this.state.items.reduce((array, item) => {
      if (item.id !== id) { array.push(item); }

      return array;
    }, []);

    this.setState({ items });
  }

  toggle() {
    this.setState({ hide: !this.state.hide });
  }

  reset() {
    this.setState(getInitialState());
  }

  renderItems() {
    return this.state.items.map(({ id, color }) => {
      return (
        <div
          key={id}
          onClick={() => this.removeItem(id)}
          className="item"
          style={{ color }}
        >
          {`${id} - ${color}`}
        </div>
      );
    });
  }

  render() {
    const {
      addItem,
      toggle,
      reset,
      renderItems,
      state: { hide },
    } = this;

    return (
      <div>
        <div className="control">
          <button onClick={addItem}>Add item</button>
          <button onClick={toggle}>{hide ? 'Show' : 'Hide'}</button>
          <button onClick={reset}>Reset</button>
        </div>
        <br />
        <Stylist
          hide={hide}
          className="stylist"
        >
          {renderItems()}
        </Stylist>
      </div>
    );
  }
}
