import objectEach from './utils/objectEach.js';

function buildInnerHTML(selector, style) {
  const cssRuleHTML = '';
  objectEach(style, (property, value) => {
    cssRuleHTML.concat(`${property}: ${value}; `);
  });

  return `${selector} { ${cssRuleHTML}}`;
}

export default class StyleTag {
  constructor(selector, style, { parentNode }) {
    const styleTag = document.createElement('style');
    const innerHTML = buildInnerHTML(selector, style);

    styleTag.innerHTML = innerHTML;

    if (parentNode) { parentNode.appendChild(styleTag); }

    this.styleTag = styleTag;
    this.selector = selector;
    this.innerHTML = innerHTML;
  }

  update(style, selector) {
    const newSelector = selector || this.selector;
    const newInnerHTML = buildInnerHTML(newSelector, style);

    if (newInnerHTML === this.innerHTML) { return; }

    this.styleTag.innerHTML = newInnerHTML;
    this.selector = newSelector;
    this.innerHTML = newInnerHTML;
  }

  destroy() {
    const { styleTag, styleTag: { parentNode } } = this;

    if (parentNode) { parentNode.removeChild(styleTag); }
  }
}
