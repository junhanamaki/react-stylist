import { objectForEach } from './Utils.js';

function toCssRuleHTML(style) {
  let cssRuleHTML = '';
  objectForEach(style, (property, value) => {
    cssRuleHTML += `${property}: ${value}; `;
  });

  return cssRuleHTML;
}

function buildInnerHTML(selector, style) {
  return `${selector} { ${toCssRuleHTML(style)} }`;
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
    const { styleTag } = this;
    const { parentNode } = styleTag;

    if (parentNode) { parentNode.removeChild(styleTag); }
  }
}
