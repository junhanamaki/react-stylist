import React from 'react';
import Stylist from '../../src/index.js';
import pickColor from '../utils/colors.js';

export default class Example extends React.Component {
  constructor() {
    super();

    this.onAddClick = this.onAddClick.bind(this);
    this.onItemClick = this.onItemClick.bind(this);

    this.seed = 0;
    this.state = { items: [] };
  }

  onAddClick() {
    const { items } = this.state;

    items.push({ id: ++this.seed, color: pickColor() });

    this.setState({ items });
  }

  onItemClick(id) {
    const items = this.state.items.reduce((array, item) => {
      if (item.id !== id) { array.push(item); }

      return array;
    }, []);

    this.setState({ items });
  }

  renderItems() {
    return this.state.items.map(({ id, color }) => {
      return (
        <div
          key={id}
          onClick={() => this.onItemClick(id)}
          className="item"
          style={{ color }}
        >
          {`${id} - ${color}`}
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <div className="control-panel">
          <button onClick={this.onAddClick}>Add</button>
        </div>
        <br />
        <Stylist className="stylist">
          {this.renderItems()}
        </Stylist>
      </div>
    );
  }
}
