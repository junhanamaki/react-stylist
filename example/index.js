import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const body = document.getElementsByTagName('body')[0];
const div = document.createElement('div');

body.appendChild(div);

ReactDOM.render(<App />, div);
