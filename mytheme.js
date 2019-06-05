"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

/* eslint-disable no-shadow */
function extractMinWidths(breakpoints) {
  return _lodash.default.flatMap(breakpoints, breakpoints => {
    if (_lodash.default.isString(breakpoints)) {

      breakpoints = {
        min: breakpoints
      };
    }

    if (!_lodash.default.isArray(breakpoints)) {
      breakpoints = [breakpoints];
    }

    return (0, _lodash.default)(breakpoints).filter(breakpoint => {
      return _lodash.default.has(breakpoint, 'min') || _lodash.default.has(breakpoint, 'min-width');
    }).map(breakpoint => {
      return _lodash.default.get(breakpoint, 'min-width', breakpoint.min);
    }).value();
  });
}

module.exports = function () {
  return function ({
    addComponents,
    theme
  }) {

    console.log('---addComponents---', addComponents);
    const minWidths = extractMinWidths(theme('container.screens', theme('screens')));
    console.log('---minWidths---', minWidths);
    const titleSize = {
      '640px': '1rem',
      '768px': '2rem',
      '1024px': '3rem',
      '1280px': '4rem',
    }
    const textSize = {
      '640px': '0.5rem',
      '768px': '1rem',
      '1024px': '2rem',
      '1280px': '3rem',
    }
    const atRules = (0, _lodash.default)(minWidths).sortBy(minWidth => parseInt(minWidth)).sortedUniq().map(minWidth => {
      return {
        [`@media (min-width: ${minWidth})`]: {
          '.title': {
            'font-size': titleSize[minWidth]
          },
          '.text': {
            'font-size': textSize[minWidth]
          }
        }
      };
    }).value();
    console.log('--atRules---', atRules);
    addComponents([{
      '.container': Object.assign({
        width: '100%'
      }, theme('container.center', false) ? {
        marginRight: 'auto',
        marginLeft: 'auto'
      } : {}, _lodash.default.has(theme('container', {}), 'padding') ? {
        paddingRight: theme('container.padding'),
        paddingLeft: theme('container.padding')
      } : {})
    }, ...atRules]);
  };
};