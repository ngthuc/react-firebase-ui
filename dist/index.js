"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function get() {
    return _Button.Button;
  }
});
Object.defineProperty(exports, "ButtonIcon", {
  enumerable: true,
  get: function get() {
    return _Button.ButtonIcon;
  }
});
Object.defineProperty(exports, "ButtonIconAndLabel", {
  enumerable: true,
  get: function get() {
    return _Button.ButtonIconAndLabel;
  }
});
Object.defineProperty(exports, "ButtonLabel", {
  enumerable: true,
  get: function get() {
    return _Button.ButtonLabel;
  }
});
Object.defineProperty(exports, "ButtonList", {
  enumerable: true,
  get: function get() {
    return _Button.ButtonList;
  }
});
Object.defineProperty(exports, "Card", {
  enumerable: true,
  get: function get() {
    return _Card.Card;
  }
});
Object.defineProperty(exports, "CardActions", {
  enumerable: true,
  get: function get() {
    return _Card.CardActions;
  }
});
Object.defineProperty(exports, "CardContent", {
  enumerable: true,
  get: function get() {
    return _Card.CardContent;
  }
});
Object.defineProperty(exports, "CardFooter", {
  enumerable: true,
  get: function get() {
    return _Card.CardFooter;
  }
});
Object.defineProperty(exports, "CardHeader", {
  enumerable: true,
  get: function get() {
    return _Card.CardHeader;
  }
});
Object.defineProperty(exports, "FirebaseUI", {
  enumerable: true,
  get: function get() {
    return _FirebaseUI.default;
  }
});
exports.Utils = void 0;

var _FirebaseUI = _interopRequireDefault(require("./components/FirebaseUI"));

var _Button = require("./components/common/Button");

var _Card = require("./components/common/Card");

var Utils = _interopRequireWildcard(require("./utils/utils"));

exports.Utils = Utils;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }