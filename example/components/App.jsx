import React from 'react';
import Stylist from '../../src/index.js';
import '../../src/styles/SlideLeft.js';

let seed = 0;

export default class App extends React.Component {
  constructor(...args) {
    super(...args);

    this.onTextChange = this.onTextChange.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);

    this.state = { items: [] };
  }

  onTextChange({ target: { value }}) {
    this.setState({ text: value });
  }

  onAddClick() {
    const { items, text } = this.state;

    items.push({ id: ++seed, text });

    this.setState({ items });
  }

  onRemoveClick(id) {
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
          onClick={() => this.onRemoveClick(id)}
          style={{ backgroundColor: 'grey', cursor: 'pointer' }}
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
        <Stylist
          style={{ display: 'inline-block' }}
        >
          {this.renderItems()}
        </Stylist>
      </div>
    );
  }
}
