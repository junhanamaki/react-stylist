import React from 'react';
import Stylist from '../../src/index.js';

export default class Example extends React.Component {
  constructor() {
    super();

    this.onTextChange = this.onTextChange.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onItemClick = this.onItemClick.bind(this);

    this.seed = 0;
    this.state = { items: [] };
  }

  onTextChange({ target: { value }}) {
    this.setState({ text: value });
  }

  onAddClick() {
    const { items, text } = this.state;

    items.push({ id: ++this.seed, text });

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
    return this.state.items.map(({ id, text }) => {
      return (
        <div
          key={id}
          onClick={() => this.onItemClick(id)}
          style={{ cursor: 'pointer' }}
        >
          {`${id} - ${text}`}
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <input onChange={this.onTextChange} value={this.state.text} />
        <button onClick={this.onAddClick}>Add</button>
        <br />
        <Stylist>
          {this.renderItems()}
        </Stylist>
      </div>
    );
  }
}
