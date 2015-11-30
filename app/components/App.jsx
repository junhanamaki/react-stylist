import React from 'react';
import Stylist from '../../src/index.js';

export default class App extends React.Component {
  constructor(...args) {
    super(...args);

    this.onAddClick = this.onAddClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);

    this.state = { items: [] };
  }

  onAddClick({ target }) {
    const items = this.state.items.slice(0);
    items.push(target.value);
    this.setState({ items: items });
  }

  onRemoveClick() {

  }

  renderItems() {

  }

  render() {
    return (
      <div>
        <button onClick={this.onAddClick}>Add</button>
        <button onClick={this.onRemoveClick}>Remove</button>
        <Stylist>
          {this.renderItems()}
        </Stylist>
      </div>
    );
  }
}
