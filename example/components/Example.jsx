import React from 'react';
import Stylist from '../../src/index.js';
import pickColor from '../utils/colors.js';

export default class Example extends React.Component {
  constructor() {
    super();

    this.addItem = this.addItem.bind(this);
    this.toggle = this.toggle.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.renderItems = this.renderItems.bind(this);

    this.seed = 0;
    this.state = { hide: false, items: [] };
  }

  addItem() {
    const { items } = this.state;

    items.push({ id: ++this.seed, color: pickColor() });

    this.setState({ items });
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
      renderItems,
      state: { hide },
    } = this;

    return (
      <div>
        <div className="control-panel">
          <button onClick={addItem}>Add item</button>
          <button onClick={toggle}>{hide ? 'show' : 'hide'}</button>
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
