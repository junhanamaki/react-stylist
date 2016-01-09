import React from 'react';

function Item({ id, color, onClick }) {
  return (
    <div key={id} onClick={() => onClick(id)} className="item" style={{ color }}>
      {`${id} - ${color}`}
    </div>
  );
}

export default Item;
