/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Gameboard = function () {
  const grid = [];
  for (let i = 0; i < 10; i++) {
    const column = [];
    for (let j = 0; j < 10; j++) {
      column.push(null);
    }
    grid.push(column);
  }
  return {
    grid: grid,
    placeShip(x, y, ship) {
      const length = ship.length;
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (this.grid[i][j] === ship) this.grid[i][j] = null;
        }
      }
      if (ship.orientation === "horizontal") {
        if (x + length > 10) return;
        for (let i = 0; i < length; i++) {
          if (this.grid[y][x + i] !== null) return;
        }
        for (let i = -1; i < length + 1; i++) {
          for (let j = -1; j < 2; j++) {
            if (y + j >= 0 && y + j <= 9 && x + i >= 0 && x + i <= 9) if (this.grid[y + j][x + i] !== null) return;
          }
        }
        for (let i = 0; i < length; i++) {
          this.grid[y][x + i] = ship;
        }
      } else if (ship.orientation === "vertical") {
        if (y + length > 10) return;
        for (let i = 0; i < length; i++) {
          if (this.grid[y + i][x] !== null) return;
        }
        for (let i = -1; i < length + 1; i++) {
          for (let j = -1; j < 2; j++) {
            if (y + i >= 0 && y + i <= 9 && x + j >= 0 && x + j <= 9) if (this.grid[y + i][x + j] !== null) return;
          }
        }
        for (let i = 0; i < length; i++) {
          this.grid[y + i][x] = ship;
        }
      }
    },
    receiveAttack(x, y) {
      if (this.grid[y][x] && Object.hasOwn(this.grid[y][x], "hit")) {
        this.grid[y][x].hit();
        this.grid[y][x] = "hit";
      } else {
        this.grid[y][x] = "miss";
      }
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");


const Player = function () {
  const playerBoard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  return {
    playerBoard: playerBoard,
    ships: {
      carrier: (0,_Ship__WEBPACK_IMPORTED_MODULE_1__["default"])(5),
      battleship: (0,_Ship__WEBPACK_IMPORTED_MODULE_1__["default"])(4),
      cruiser: (0,_Ship__WEBPACK_IMPORTED_MODULE_1__["default"])(3),
      submarine: (0,_Ship__WEBPACK_IMPORTED_MODULE_1__["default"])(3),
      destroyer: (0,_Ship__WEBPACK_IMPORTED_MODULE_1__["default"])(2)
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Ship = function (length) {
  let hitCount = 0;
  let orientation = "horizontal";
  return {
    length: length,
    hitCount: hitCount,
    orientation: orientation,
    isSunk() {
      return this.hitCount === this.length ? true : false;
    },
    hit() {
      if (this.hitCount < this.length) this.hitCount++;
    },
    changeOrientation() {
      this.orientation = this.orientation === "horizontal" ? "vertical" : "horizontal";
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTag: () => (/* binding */ createTag),
/* harmony export */   createTagWithAttributes: () => (/* binding */ createTagWithAttributes),
/* harmony export */   getLocalStorageJSON: () => (/* binding */ getLocalStorageJSON),
/* harmony export */   increaseIDcount: () => (/* binding */ increaseIDcount),
/* harmony export */   pushLocalStorageJSON: () => (/* binding */ pushLocalStorageJSON),
/* harmony export */   setLocalStorageJSON: () => (/* binding */ setLocalStorageJSON)
/* harmony export */ });
function setLocalStorageJSON(key, object) {
  let string = JSON.stringify(object);
  localStorage.setItem(key, string);
}
function getLocalStorageJSON(key) {
  let objectString = localStorage.getItem(key);
  return JSON.parse(objectString);
}
function pushLocalStorageJSON(key, object) {
  let arrayString = localStorage.getItem(key);
  let array = JSON.parse(arrayString);
  array.push(object);
  arrayString = JSON.stringify(array);
  localStorage.setItem(key, arrayString);
}
function increaseIDcount(idKey) {
  localStorage.setItem(idKey, (parseInt(localStorage.getItem(idKey)) + 1).toString());
}
function createTag(tag, cls, text) {
  let element = document.createElement(tag);
  if (typeof cls == "object") {
    cls.forEach(cl => {
      element.classList.add(cl);
    });
  } else if (typeof cls == "string") {
    element.classList.add(cls);
  } else if (!cls) {}
  element.innerHTML = text;
  return element;
}
function createTagWithAttributes(tag, cls, attributes, text) {
  let element = document.createElement(tag);
  if (cls) {
    element.classList.add(cls);
  }
  attributes.forEach(attribute => {
    element.setAttribute(attribute[0], attribute[1]);
  });
  element.innerHTML = text;
  return element;
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `*,  *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', system-ui;
}

.container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-columns: repeat(10, 1fr);
    width: min-content;
}

.box {
    border: 1px solid black;
    height: 1rem;
    width: 1rem;
}

.box.filled {
    background-color: brown;
}

.ships {
    width: 12rem;
    height: 12rem;
}

.ships, .ships > tr, .ship-row {
    border: 1px solid black;
    border-collapse: collapse;
}

.ship-row {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}

.vertical {
    display: flex;
    flex-direction: column;
}

.horizontal {
    display: flex;
    flex-direction: row;
}

.ship-box {
    border: 1px solid black;
    height: 1rem;
    width: 1rem;
    background-color: blue;
}

.rotate-button {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #334155;
    color: white;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
}

.rotate-button:hover {
    cursor: pointer;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,UAAU;IACV,sBAAsB;IACtB,gCAAgC;AACpC;;AAEA;IACI,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,SAAS;AACb;;AAEA;IACI,aAAa;IACb,sCAAsC;IACtC,sCAAsC;IACtC,kBAAkB;AACtB;;AAEA;IACI,uBAAuB;IACvB,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,YAAY;IACZ,aAAa;AACjB;;AAEA;IACI,uBAAuB;IACvB,yBAAyB;AAC7B;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,aAAa;AACjB;;AAEA;IACI,aAAa;IACb,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,uBAAuB;IACvB,YAAY;IACZ,WAAW;IACX,sBAAsB;AAC1B;;AAEA;IACI,iBAAiB;IACjB,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,yBAAyB;IACzB,YAAY;IACZ,aAAa;IACb,cAAc;IACd,kBAAkB;AACtB;;AAEA;IACI,eAAe;AACnB","sourcesContent":["*,  *::before, *::after {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n    font-family: 'Roboto', system-ui;\n}\n\n.container {\n    padding: 2rem;\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n}\n\n.grid {\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-columns: repeat(10, 1fr);\n    width: min-content;\n}\n\n.box {\n    border: 1px solid black;\n    height: 1rem;\n    width: 1rem;\n}\n\n.box.filled {\n    background-color: brown;\n}\n\n.ships {\n    width: 12rem;\n    height: 12rem;\n}\n\n.ships, .ships > tr, .ship-row {\n    border: 1px solid black;\n    border-collapse: collapse;\n}\n\n.ship-row {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 1rem;\n}\n\n.vertical {\n    display: flex;\n    flex-direction: column;\n}\n\n.horizontal {\n    display: flex;\n    flex-direction: row;\n}\n\n.ship-box {\n    border: 1px solid black;\n    height: 1rem;\n    width: 1rem;\n    background-color: blue;\n}\n\n.rotate-button {\n    margin-left: auto;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: #334155;\n    color: white;\n    width: 1.5rem;\n    height: 1.5rem;\n    border-radius: 50%;\n}\n\n.rotate-button:hover {\n    cursor: pointer;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/helper.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ "./src/Player.js");
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");





const grid = document.querySelector(".grid");
const playerA = (0,_Player__WEBPACK_IMPORTED_MODULE_2__["default"])();
let selectedShip = null;
function loadGrids() {
  grid.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let box = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.createTag)("div", "box", "");
      if (playerA.playerBoard.grid[i][j] !== null) box.classList.add("filled");
      box.addEventListener("click", () => {
        if (selectedShip !== null) {
          console.log(selectedShip);
          playerA.playerBoard.placeShip(j, i, selectedShip);
          selectedShip = null;
          loadGrids();
        }
        if (selectedShip === null && box.classList.contains("filled")) {
          selectedShip = playerA.playerBoard.grid[i][j];
        }
      });
      grid.appendChild(box);
    }
  }
}
loadGrids();
const shipRows = document.querySelectorAll(".ship-row");
const ships = Object.keys(playerA.ships);
shipRows.forEach((row, index) => {
  let shipLength = playerA.ships[ships[index]].length;
  let shipDisplay = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.createTag)("div", ["ship", playerA.ships[ships[index]].orientation], "");
  for (let i = 0; i < shipLength; i++) {
    let square = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.createTag)("div", "ship-box", "");
    shipDisplay.appendChild(square);
  }
  shipDisplay.addEventListener("click", () => {
    selectedShip = playerA.ships[ships[index]];
    console.log(selectedShip);
  });
  row.appendChild(shipDisplay);
  let rotateButton = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.createTag)("div", "rotate-button", "R");
  rotateButton.addEventListener("click", () => {
    playerA.ships[ships[index]].changeOrientation();
    shipDisplay.classList.remove("vertical");
    shipDisplay.classList.remove("horizontal");
    shipDisplay.classList.add(playerA.ships[ships[index]].orientation);
  });
  row.appendChild(rotateButton);
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsTUFBTSxDQUFDQyxPQUFPLEdBQUcsVUFBVUMsc0JBQXNCLEVBQUU7RUFDakQsSUFBSUMsSUFBSSxHQUFHLEVBQUU7O0VBRWI7RUFDQUEsSUFBSSxDQUFDQyxRQUFRLEdBQUcsU0FBU0EsUUFBUUEsQ0FBQSxFQUFHO0lBQ2xDLE9BQU8sSUFBSSxDQUFDQyxHQUFHLENBQUMsVUFBVUMsSUFBSSxFQUFFO01BQzlCLElBQUlDLE9BQU8sR0FBRyxFQUFFO01BQ2hCLElBQUlDLFNBQVMsR0FBRyxPQUFPRixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVztNQUM5QyxJQUFJQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDWEMsT0FBTyxJQUFJLGFBQWEsQ0FBQ0UsTUFBTSxDQUFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDO01BQ2pEO01BQ0EsSUFBSUEsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ1hDLE9BQU8sSUFBSSxTQUFTLENBQUNFLE1BQU0sQ0FBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQztNQUM1QztNQUNBLElBQUlFLFNBQVMsRUFBRTtRQUNiRCxPQUFPLElBQUksUUFBUSxDQUFDRSxNQUFNLENBQUNILElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUNELE1BQU0sQ0FBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQztNQUNqRjtNQUNBQyxPQUFPLElBQUlMLHNCQUFzQixDQUFDSSxJQUFJLENBQUM7TUFDdkMsSUFBSUUsU0FBUyxFQUFFO1FBQ2JELE9BQU8sSUFBSSxHQUFHO01BQ2hCO01BQ0EsSUFBSUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ1hDLE9BQU8sSUFBSSxHQUFHO01BQ2hCO01BQ0EsSUFBSUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ1hDLE9BQU8sSUFBSSxHQUFHO01BQ2hCO01BQ0EsT0FBT0EsT0FBTztJQUNoQixDQUFDLENBQUMsQ0FBQ0ksSUFBSSxDQUFDLEVBQUUsQ0FBQztFQUNiLENBQUM7O0VBRUQ7RUFDQVIsSUFBSSxDQUFDUyxDQUFDLEdBQUcsU0FBU0EsQ0FBQ0EsQ0FBQ0MsT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE1BQU0sRUFBRUMsUUFBUSxFQUFFQyxLQUFLLEVBQUU7SUFDM0QsSUFBSSxPQUFPSixPQUFPLEtBQUssUUFBUSxFQUFFO01BQy9CQSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRUEsT0FBTyxFQUFFSyxTQUFTLENBQUMsQ0FBQztJQUN4QztJQUNBLElBQUlDLHNCQUFzQixHQUFHLENBQUMsQ0FBQztJQUMvQixJQUFJSixNQUFNLEVBQUU7TUFDVixLQUFLLElBQUlLLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxJQUFJLENBQUNWLE1BQU0sRUFBRVUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSUMsRUFBRSxHQUFHLElBQUksQ0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLElBQUlDLEVBQUUsSUFBSSxJQUFJLEVBQUU7VUFDZEYsc0JBQXNCLENBQUNFLEVBQUUsQ0FBQyxHQUFHLElBQUk7UUFDbkM7TUFDRjtJQUNGO0lBQ0EsS0FBSyxJQUFJQyxFQUFFLEdBQUcsQ0FBQyxFQUFFQSxFQUFFLEdBQUdULE9BQU8sQ0FBQ0gsTUFBTSxFQUFFWSxFQUFFLEVBQUUsRUFBRTtNQUMxQyxJQUFJaEIsSUFBSSxHQUFHLEVBQUUsQ0FBQ0csTUFBTSxDQUFDSSxPQUFPLENBQUNTLEVBQUUsQ0FBQyxDQUFDO01BQ2pDLElBQUlQLE1BQU0sSUFBSUksc0JBQXNCLENBQUNiLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzdDO01BQ0Y7TUFDQSxJQUFJLE9BQU9XLEtBQUssS0FBSyxXQUFXLEVBQUU7UUFDaEMsSUFBSSxPQUFPWCxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO1VBQ2xDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUdXLEtBQUs7UUFDakIsQ0FBQyxNQUFNO1VBQ0xYLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUNHLE1BQU0sQ0FBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDSSxNQUFNLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQ0QsTUFBTSxDQUFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUNHLE1BQU0sQ0FBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztVQUNuR0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHVyxLQUFLO1FBQ2pCO01BQ0Y7TUFDQSxJQUFJSCxLQUFLLEVBQUU7UUFDVCxJQUFJLENBQUNSLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtVQUNaQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUdRLEtBQUs7UUFDakIsQ0FBQyxNQUFNO1VBQ0xSLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUNHLE1BQU0sQ0FBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDRyxNQUFNLENBQUNILElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7VUFDOURBLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBR1EsS0FBSztRQUNqQjtNQUNGO01BQ0EsSUFBSUUsUUFBUSxFQUFFO1FBQ1osSUFBSSxDQUFDVixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7VUFDWkEsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQ0csTUFBTSxDQUFDTyxRQUFRLENBQUM7UUFDL0IsQ0FBQyxNQUFNO1VBQ0xWLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUNHLE1BQU0sQ0FBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDRyxNQUFNLENBQUNILElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7VUFDbkVBLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBR1UsUUFBUTtRQUNwQjtNQUNGO01BQ0FiLElBQUksQ0FBQ29CLElBQUksQ0FBQ2pCLElBQUksQ0FBQztJQUNqQjtFQUNGLENBQUM7RUFDRCxPQUFPSCxJQUFJO0FBQ2IsQ0FBQzs7Ozs7Ozs7OztBQ3BGWTs7QUFFYkgsTUFBTSxDQUFDQyxPQUFPLEdBQUcsVUFBVUssSUFBSSxFQUFFO0VBQy9CLElBQUlDLE9BQU8sR0FBR0QsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNyQixJQUFJa0IsVUFBVSxHQUFHbEIsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUN4QixJQUFJLENBQUNrQixVQUFVLEVBQUU7SUFDZixPQUFPakIsT0FBTztFQUNoQjtFQUNBLElBQUksT0FBT2tCLElBQUksS0FBSyxVQUFVLEVBQUU7SUFDOUIsSUFBSUMsTUFBTSxHQUFHRCxJQUFJLENBQUNFLFFBQVEsQ0FBQ0Msa0JBQWtCLENBQUNDLElBQUksQ0FBQ0MsU0FBUyxDQUFDTixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0UsSUFBSU8sSUFBSSxHQUFHLDhEQUE4RCxDQUFDdEIsTUFBTSxDQUFDaUIsTUFBTSxDQUFDO0lBQ3hGLElBQUlNLGFBQWEsR0FBRyxNQUFNLENBQUN2QixNQUFNLENBQUNzQixJQUFJLEVBQUUsS0FBSyxDQUFDO0lBQzlDLE9BQU8sQ0FBQ3hCLE9BQU8sQ0FBQyxDQUFDRSxNQUFNLENBQUMsQ0FBQ3VCLGFBQWEsQ0FBQyxDQUFDLENBQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDO0VBQ3JEO0VBQ0EsT0FBTyxDQUFDSixPQUFPLENBQUMsQ0FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQztBQUM3QixDQUFDOzs7Ozs7Ozs7Ozs7OztBQ2ZELE1BQU1zQixTQUFTLEdBQUcsU0FBQUEsQ0FBQSxFQUFZO0VBQzVCLE1BQU1DLElBQUksR0FBRyxFQUFFO0VBRWYsS0FBSyxJQUFJdEIsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7SUFDM0IsTUFBTXVCLE1BQU0sR0FBRyxFQUFFO0lBQ2pCLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7TUFDM0JELE1BQU0sQ0FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQjtJQUNBVyxJQUFJLENBQUNYLElBQUksQ0FBQ1ksTUFBTSxDQUFDO0VBQ25CO0VBRUEsT0FBTztJQUNMRCxJQUFJLEVBQUVBLElBQUk7SUFFVkcsU0FBU0EsQ0FBQ0MsQ0FBQyxFQUFFQyxDQUFDLEVBQUVDLElBQUksRUFBRTtNQUNwQixNQUFNOUIsTUFBTSxHQUFHOEIsSUFBSSxDQUFDOUIsTUFBTTtNQUUxQixLQUFLLElBQUlFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO1FBQzNCLEtBQUssSUFBSXdCLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO1VBQzNCLElBQUksSUFBSSxDQUFDRixJQUFJLENBQUN0QixDQUFDLENBQUMsQ0FBQ3dCLENBQUMsQ0FBQyxLQUFLSSxJQUFJLEVBQUUsSUFBSSxDQUFDTixJQUFJLENBQUN0QixDQUFDLENBQUMsQ0FBQ3dCLENBQUMsQ0FBQyxHQUFHLElBQUk7UUFDdEQ7TUFDRjtNQUVBLElBQUlJLElBQUksQ0FBQ0MsV0FBVyxLQUFLLFlBQVksRUFBRTtRQUNyQyxJQUFJSCxDQUFDLEdBQUc1QixNQUFNLEdBQUcsRUFBRSxFQUFFO1FBRXJCLEtBQUssSUFBSUUsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRixNQUFNLEVBQUVFLENBQUMsRUFBRSxFQUFFO1VBQy9CLElBQUksSUFBSSxDQUFDc0IsSUFBSSxDQUFDSyxDQUFDLENBQUMsQ0FBQ0QsQ0FBQyxHQUFHMUIsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3BDO1FBRUEsS0FBSyxJQUFJQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBR0YsTUFBTSxHQUFHLENBQUMsRUFBRUUsQ0FBQyxFQUFFLEVBQUU7VUFDcEMsS0FBSyxJQUFJd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEVBQUUsRUFBRTtZQUMzQixJQUFJRyxDQUFDLEdBQUdILENBQUMsSUFBSSxDQUFDLElBQUlHLENBQUMsR0FBR0gsQ0FBQyxJQUFJLENBQUMsSUFBSUUsQ0FBQyxHQUFHMUIsQ0FBQyxJQUFJLENBQUMsSUFBSTBCLENBQUMsR0FBRzFCLENBQUMsSUFBSSxDQUFDLEVBQ3RELElBQUksSUFBSSxDQUFDc0IsSUFBSSxDQUFDSyxDQUFDLEdBQUdILENBQUMsQ0FBQyxDQUFDRSxDQUFDLEdBQUcxQixDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7VUFDMUM7UUFDRjtRQUVBLEtBQUssSUFBSUEsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRixNQUFNLEVBQUVFLENBQUMsRUFBRSxFQUFFO1VBQy9CLElBQUksQ0FBQ3NCLElBQUksQ0FBQ0ssQ0FBQyxDQUFDLENBQUNELENBQUMsR0FBRzFCLENBQUMsQ0FBQyxHQUFHNEIsSUFBSTtRQUM1QjtNQUNGLENBQUMsTUFBTSxJQUFJQSxJQUFJLENBQUNDLFdBQVcsS0FBSyxVQUFVLEVBQUU7UUFDMUMsSUFBSUYsQ0FBQyxHQUFHN0IsTUFBTSxHQUFHLEVBQUUsRUFBRTtRQUVyQixLQUFLLElBQUlFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0YsTUFBTSxFQUFFRSxDQUFDLEVBQUUsRUFBRTtVQUMvQixJQUFJLElBQUksQ0FBQ3NCLElBQUksQ0FBQ0ssQ0FBQyxHQUFHM0IsQ0FBQyxDQUFDLENBQUMwQixDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDcEM7UUFFQSxLQUFLLElBQUkxQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBR0YsTUFBTSxHQUFHLENBQUMsRUFBRUUsQ0FBQyxFQUFFLEVBQUU7VUFDcEMsS0FBSyxJQUFJd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEVBQUUsRUFBRTtZQUMzQixJQUFJRyxDQUFDLEdBQUczQixDQUFDLElBQUksQ0FBQyxJQUFJMkIsQ0FBQyxHQUFHM0IsQ0FBQyxJQUFJLENBQUMsSUFBSTBCLENBQUMsR0FBR0YsQ0FBQyxJQUFJLENBQUMsSUFBSUUsQ0FBQyxHQUFHRixDQUFDLElBQUksQ0FBQyxFQUN0RCxJQUFJLElBQUksQ0FBQ0YsSUFBSSxDQUFDSyxDQUFDLEdBQUczQixDQUFDLENBQUMsQ0FBQzBCLENBQUMsR0FBR0YsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1VBQzFDO1FBQ0Y7UUFFQSxLQUFLLElBQUl4QixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdGLE1BQU0sRUFBRUUsQ0FBQyxFQUFFLEVBQUU7VUFDL0IsSUFBSSxDQUFDc0IsSUFBSSxDQUFDSyxDQUFDLEdBQUczQixDQUFDLENBQUMsQ0FBQzBCLENBQUMsQ0FBQyxHQUFHRSxJQUFJO1FBQzVCO01BQ0Y7SUFDRixDQUFDO0lBRURFLGFBQWFBLENBQUNKLENBQUMsRUFBRUMsQ0FBQyxFQUFFO01BQ2xCLElBQUksSUFBSSxDQUFDTCxJQUFJLENBQUNLLENBQUMsQ0FBQyxDQUFDRCxDQUFDLENBQUMsSUFBSUssTUFBTSxDQUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDVixJQUFJLENBQUNLLENBQUMsQ0FBQyxDQUFDRCxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRTtRQUM1RCxJQUFJLENBQUNKLElBQUksQ0FBQ0ssQ0FBQyxDQUFDLENBQUNELENBQUMsQ0FBQyxDQUFDTyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUNYLElBQUksQ0FBQ0ssQ0FBQyxDQUFDLENBQUNELENBQUMsQ0FBQyxHQUFHLEtBQUs7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QUMsQ0FBQy9ELFdBQVcsQ0FBQztFQUNwRSxDQUFDLENBQUM7RUFDRjhELEdBQUcsQ0FBQ0osV0FBVyxDQUFDUyxZQUFZLENBQUM7QUFDL0IsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXdlYnBhY2svLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtd2VicGFjay8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtd2VicGFjay8uL3NyYy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC13ZWJwYWNrLy4vc3JjL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXdlYnBhY2svLi9zcmMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXdlYnBhY2svLi9zcmMvaGVscGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtd2VicGFjay8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC13ZWJwYWNrLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAtd2VicGFjay8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXdlYnBhY2svLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtd2VicGFjay8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXdlYnBhY2svLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC13ZWJwYWNrLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC13ZWJwYWNrLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC13ZWJwYWNrL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAtd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXdlYnBhY2svd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAtd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAtd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAtd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC13ZWJwYWNrLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJjb25zdCBHYW1lYm9hcmQgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGdyaWQgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBjb25zdCBjb2x1bW4gPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNvbHVtbi5wdXNoKG51bGwpO1xuICAgIH1cbiAgICBncmlkLnB1c2goY29sdW1uKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ3JpZDogZ3JpZCxcblxuICAgIHBsYWNlU2hpcCh4LCB5LCBzaGlwKSB7XG4gICAgICBjb25zdCBsZW5ndGggPSBzaGlwLmxlbmd0aDtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgIGlmICh0aGlzLmdyaWRbaV1bal0gPT09IHNoaXApIHRoaXMuZ3JpZFtpXVtqXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgIGlmICh4ICsgbGVuZ3RoID4gMTApIHJldHVybjtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMuZ3JpZFt5XVt4ICsgaV0gIT09IG51bGwpIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAtMTsgaSA8IGxlbmd0aCArIDE7IGkrKykge1xuICAgICAgICAgIGZvciAobGV0IGogPSAtMTsgaiA8IDI7IGorKykge1xuICAgICAgICAgICAgaWYgKHkgKyBqID49IDAgJiYgeSArIGogPD0gOSAmJiB4ICsgaSA+PSAwICYmIHggKyBpIDw9IDkpXG4gICAgICAgICAgICAgIGlmICh0aGlzLmdyaWRbeSArIGpdW3ggKyBpXSAhPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmdyaWRbeV1beCArIGldID0gc2hpcDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgaWYgKHkgKyBsZW5ndGggPiAxMCkgcmV0dXJuO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5ncmlkW3kgKyBpXVt4XSAhPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IC0xOyBpIDwgbGVuZ3RoICsgMTsgaSsrKSB7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IC0xOyBqIDwgMjsgaisrKSB7XG4gICAgICAgICAgICBpZiAoeSArIGkgPj0gMCAmJiB5ICsgaSA8PSA5ICYmIHggKyBqID49IDAgJiYgeCArIGogPD0gOSlcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JpZFt5ICsgaV1beCArIGpdICE9PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuZ3JpZFt5ICsgaV1beF0gPSBzaGlwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgICAgaWYgKHRoaXMuZ3JpZFt5XVt4XSAmJiBPYmplY3QuaGFzT3duKHRoaXMuZ3JpZFt5XVt4XSwgXCJoaXRcIikpIHtcbiAgICAgICAgdGhpcy5ncmlkW3ldW3hdLmhpdCgpO1xuICAgICAgICB0aGlzLmdyaWRbeV1beF0gPSBcImhpdFwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ncmlkW3ldW3hdID0gXCJtaXNzXCI7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9TaGlwXCI7XG5cbmNvbnN0IFBsYXllciA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgcmV0dXJuIHtcbiAgICBwbGF5ZXJCb2FyZDogcGxheWVyQm9hcmQsXG4gICAgc2hpcHM6IHtcbiAgICAgIGNhcnJpZXI6IFNoaXAoNSksXG4gICAgICBiYXR0bGVzaGlwOiBTaGlwKDQpLFxuICAgICAgY3J1aXNlcjogU2hpcCgzKSxcbiAgICAgIHN1Ym1hcmluZTogU2hpcCgzKSxcbiAgICAgIGRlc3Ryb3llcjogU2hpcCgyKSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiY29uc3QgU2hpcCA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcbiAgbGV0IGhpdENvdW50ID0gMDtcbiAgbGV0IG9yaWVudGF0aW9uID0gXCJob3Jpem9udGFsXCI7XG4gIHJldHVybiB7XG4gICAgbGVuZ3RoOiBsZW5ndGgsXG4gICAgaGl0Q291bnQ6IGhpdENvdW50LFxuICAgIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvbixcblxuICAgIGlzU3VuaygpIHtcbiAgICAgIHJldHVybiB0aGlzLmhpdENvdW50ID09PSB0aGlzLmxlbmd0aCA/IHRydWUgOiBmYWxzZTtcbiAgICB9LFxuXG4gICAgaGl0KCkge1xuICAgICAgaWYgKHRoaXMuaGl0Q291bnQgPCB0aGlzLmxlbmd0aCkgdGhpcy5oaXRDb3VudCsrO1xuICAgIH0sXG5cbiAgICBjaGFuZ2VPcmllbnRhdGlvbigpIHtcbiAgICAgIHRoaXMub3JpZW50YXRpb24gPVxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIiA/IFwidmVydGljYWxcIiA6IFwiaG9yaXpvbnRhbFwiO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiZnVuY3Rpb24gc2V0TG9jYWxTdG9yYWdlSlNPTihrZXksIG9iamVjdCkge1xuICBsZXQgc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkob2JqZWN0KTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBzdHJpbmcpO1xufVxuXG5mdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2VKU09OKGtleSkge1xuICBsZXQgb2JqZWN0U3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgcmV0dXJuIEpTT04ucGFyc2Uob2JqZWN0U3RyaW5nKTtcbn1cblxuZnVuY3Rpb24gcHVzaExvY2FsU3RvcmFnZUpTT04oa2V5LCBvYmplY3QpIHtcbiAgbGV0IGFycmF5U3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgbGV0IGFycmF5ID0gSlNPTi5wYXJzZShhcnJheVN0cmluZyk7XG4gIGFycmF5LnB1c2gob2JqZWN0KTtcbiAgYXJyYXlTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShhcnJheSk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgYXJyYXlTdHJpbmcpO1xufVxuXG5mdW5jdGlvbiBpbmNyZWFzZUlEY291bnQoaWRLZXkpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgaWRLZXksXG4gICAgKHBhcnNlSW50KGxvY2FsU3RvcmFnZS5nZXRJdGVtKGlkS2V5KSkgKyAxKS50b1N0cmluZygpXG4gICk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhZyh0YWcsIGNscywgdGV4dCkge1xuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgaWYgKHR5cGVvZiBjbHMgPT0gXCJvYmplY3RcIikge1xuICAgIGNscy5mb3JFYWNoKChjbCkgPT4ge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgY2xzID09IFwic3RyaW5nXCIpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xzKTtcbiAgfSBlbHNlIGlmICghY2xzKSB7XG4gIH1cbiAgZWxlbWVudC5pbm5lckhUTUwgPSB0ZXh0O1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGFnV2l0aEF0dHJpYnV0ZXModGFnLCBjbHMsIGF0dHJpYnV0ZXMsIHRleHQpIHtcbiAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gIGlmIChjbHMpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xzKTtcbiAgfVxuICBhdHRyaWJ1dGVzLmZvckVhY2goKGF0dHJpYnV0ZSkgPT4ge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZVswXSwgYXR0cmlidXRlWzFdKTtcbiAgfSk7XG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dDtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmV4cG9ydCB7XG4gIHNldExvY2FsU3RvcmFnZUpTT04sXG4gIGdldExvY2FsU3RvcmFnZUpTT04sXG4gIHB1c2hMb2NhbFN0b3JhZ2VKU09OLFxuICBjcmVhdGVUYWcsXG4gIGNyZWF0ZVRhZ1dpdGhBdHRyaWJ1dGVzLFxuICBpbmNyZWFzZUlEY291bnQsXG59O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCosICAqOjpiZWZvcmUsICo6OmFmdGVyIHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc3lzdGVtLXVpO1xufVxuXG4uY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiAycmVtO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBnYXA6IDFyZW07XG59XG5cbi5ncmlkIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xuICAgIHdpZHRoOiBtaW4tY29udGVudDtcbn1cblxuLmJveCB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gICAgaGVpZ2h0OiAxcmVtO1xuICAgIHdpZHRoOiAxcmVtO1xufVxuXG4uYm94LmZpbGxlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYnJvd247XG59XG5cbi5zaGlwcyB7XG4gICAgd2lkdGg6IDEycmVtO1xuICAgIGhlaWdodDogMTJyZW07XG59XG5cbi5zaGlwcywgLnNoaXBzID4gdHIsIC5zaGlwLXJvdyB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbn1cblxuLnNoaXAtcm93IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMXJlbTtcbn1cblxuLnZlcnRpY2FsIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5ob3Jpem9udGFsIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG59XG5cbi5zaGlwLWJveCB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gICAgaGVpZ2h0OiAxcmVtO1xuICAgIHdpZHRoOiAxcmVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XG59XG5cbi5yb3RhdGUtYnV0dG9uIHtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzNDE1NTtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgd2lkdGg6IDEuNXJlbTtcbiAgICBoZWlnaHQ6IDEuNXJlbTtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG59XG5cbi5yb3RhdGUtYnV0dG9uOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksU0FBUztJQUNULFVBQVU7SUFDVixzQkFBc0I7SUFDdEIsZ0NBQWdDO0FBQ3BDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsU0FBUztBQUNiOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNDQUFzQztJQUN0QyxzQ0FBc0M7SUFDdEMsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtBQUNqQjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2Qix5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsWUFBWTtJQUNaLFdBQVc7SUFDWCxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixhQUFhO0lBQ2IsY0FBYztJQUNkLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGVBQWU7QUFDbkJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiwgICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc3lzdGVtLXVpO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gICAgcGFkZGluZzogMnJlbTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZ2FwOiAxcmVtO1xcbn1cXG5cXG4uZ3JpZCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgd2lkdGg6IG1pbi1jb250ZW50O1xcbn1cXG5cXG4uYm94IHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICAgIGhlaWdodDogMXJlbTtcXG4gICAgd2lkdGg6IDFyZW07XFxufVxcblxcbi5ib3guZmlsbGVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYnJvd247XFxufVxcblxcbi5zaGlwcyB7XFxuICAgIHdpZHRoOiAxMnJlbTtcXG4gICAgaGVpZ2h0OiAxMnJlbTtcXG59XFxuXFxuLnNoaXBzLCAuc2hpcHMgPiB0ciwgLnNoaXAtcm93IHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxufVxcblxcbi5zaGlwLXJvdyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAxcmVtO1xcbn1cXG5cXG4udmVydGljYWwge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4uaG9yaXpvbnRhbCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxufVxcblxcbi5zaGlwLWJveCB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBoZWlnaHQ6IDFyZW07XFxuICAgIHdpZHRoOiAxcmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcbn1cXG5cXG4ucm90YXRlLWJ1dHRvbiB7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzNDE1NTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICB3aWR0aDogMS41cmVtO1xcbiAgICBoZWlnaHQ6IDEuNXJlbTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG5cXG4ucm90YXRlLWJ1dHRvbjpob3ZlciB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcbm9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgeyBjcmVhdGVUYWcgfSBmcm9tIFwiLi9oZWxwZXJcIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vU2hpcFwiO1xuXG5jb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkXCIpO1xuY29uc3QgcGxheWVyQSA9IFBsYXllcigpO1xubGV0IHNlbGVjdGVkU2hpcCA9IG51bGw7XG5cbmZ1bmN0aW9uIGxvYWRHcmlkcygpIHtcbiAgZ3JpZC5pbm5lckhUTUwgPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGxldCBib3ggPSBjcmVhdGVUYWcoXCJkaXZcIiwgXCJib3hcIiwgXCJcIik7XG4gICAgICBpZiAocGxheWVyQS5wbGF5ZXJCb2FyZC5ncmlkW2ldW2pdICE9PSBudWxsKSBib3guY2xhc3NMaXN0LmFkZChcImZpbGxlZFwiKTtcbiAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoc2VsZWN0ZWRTaGlwICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coc2VsZWN0ZWRTaGlwKTtcbiAgICAgICAgICBwbGF5ZXJBLnBsYXllckJvYXJkLnBsYWNlU2hpcChqLCBpLCBzZWxlY3RlZFNoaXApO1xuICAgICAgICAgIHNlbGVjdGVkU2hpcCA9IG51bGw7XG4gICAgICAgICAgbG9hZEdyaWRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdGVkU2hpcCA9PT0gbnVsbCAmJiBib3guY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmlsbGVkXCIpKSB7XG4gICAgICAgICAgc2VsZWN0ZWRTaGlwID0gcGxheWVyQS5wbGF5ZXJCb2FyZC5ncmlkW2ldW2pdO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGdyaWQuYXBwZW5kQ2hpbGQoYm94KTtcbiAgICB9XG4gIH1cbn1cblxubG9hZEdyaWRzKCk7XG5cbmNvbnN0IHNoaXBSb3dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwLXJvd1wiKTtcbmNvbnN0IHNoaXBzID0gT2JqZWN0LmtleXMocGxheWVyQS5zaGlwcyk7XG5zaGlwUm93cy5mb3JFYWNoKChyb3csIGluZGV4KSA9PiB7XG4gIGxldCBzaGlwTGVuZ3RoID0gcGxheWVyQS5zaGlwc1tzaGlwc1tpbmRleF1dLmxlbmd0aDtcbiAgbGV0IHNoaXBEaXNwbGF5ID0gY3JlYXRlVGFnKFxuICAgIFwiZGl2XCIsXG4gICAgW1wic2hpcFwiLCBwbGF5ZXJBLnNoaXBzW3NoaXBzW2luZGV4XV0ub3JpZW50YXRpb25dLFxuICAgIFwiXCJcbiAgKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgc3F1YXJlID0gY3JlYXRlVGFnKFwiZGl2XCIsIFwic2hpcC1ib3hcIiwgXCJcIik7XG4gICAgc2hpcERpc3BsYXkuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgfVxuICBzaGlwRGlzcGxheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHNlbGVjdGVkU2hpcCA9IHBsYXllckEuc2hpcHNbc2hpcHNbaW5kZXhdXTtcbiAgICBjb25zb2xlLmxvZyhzZWxlY3RlZFNoaXApO1xuICB9KTtcbiAgcm93LmFwcGVuZENoaWxkKHNoaXBEaXNwbGF5KTtcblxuICBsZXQgcm90YXRlQnV0dG9uID0gY3JlYXRlVGFnKFwiZGl2XCIsIFwicm90YXRlLWJ1dHRvblwiLCBcIlJcIik7XG4gIHJvdGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHBsYXllckEuc2hpcHNbc2hpcHNbaW5kZXhdXS5jaGFuZ2VPcmllbnRhdGlvbigpO1xuICAgIHNoaXBEaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJ2ZXJ0aWNhbFwiKTtcbiAgICBzaGlwRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKFwiaG9yaXpvbnRhbFwiKTtcbiAgICBzaGlwRGlzcGxheS5jbGFzc0xpc3QuYWRkKHBsYXllckEuc2hpcHNbc2hpcHNbaW5kZXhdXS5vcmllbnRhdGlvbik7XG4gIH0pO1xuICByb3cuYXBwZW5kQ2hpbGQocm90YXRlQnV0dG9uKTtcbn0pO1xuIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJjc3NXaXRoTWFwcGluZ1RvU3RyaW5nIiwibGlzdCIsInRvU3RyaW5nIiwibWFwIiwiaXRlbSIsImNvbnRlbnQiLCJuZWVkTGF5ZXIiLCJjb25jYXQiLCJsZW5ndGgiLCJqb2luIiwiaSIsIm1vZHVsZXMiLCJtZWRpYSIsImRlZHVwZSIsInN1cHBvcnRzIiwibGF5ZXIiLCJ1bmRlZmluZWQiLCJhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzIiwiayIsImlkIiwiX2siLCJwdXNoIiwiY3NzTWFwcGluZyIsImJ0b2EiLCJiYXNlNjQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJkYXRhIiwic291cmNlTWFwcGluZyIsIkdhbWVib2FyZCIsImdyaWQiLCJjb2x1bW4iLCJqIiwicGxhY2VTaGlwIiwieCIsInkiLCJzaGlwIiwib3JpZW50YXRpb24iLCJyZWNlaXZlQXR0YWNrIiwiT2JqZWN0IiwiaGFzT3duIiwiaGl0IiwiU2hpcCIsIlBsYXllciIsInBsYXllckJvYXJkIiwic2hpcHMiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJoaXRDb3VudCIsImlzU3VuayIsImNoYW5nZU9yaWVudGF0aW9uIiwic2V0TG9jYWxTdG9yYWdlSlNPTiIsImtleSIsIm9iamVjdCIsInN0cmluZyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJnZXRMb2NhbFN0b3JhZ2VKU09OIiwib2JqZWN0U3RyaW5nIiwiZ2V0SXRlbSIsInBhcnNlIiwicHVzaExvY2FsU3RvcmFnZUpTT04iLCJhcnJheVN0cmluZyIsImFycmF5IiwiaW5jcmVhc2VJRGNvdW50IiwiaWRLZXkiLCJwYXJzZUludCIsImNyZWF0ZVRhZyIsInRhZyIsImNscyIsInRleHQiLCJlbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZm9yRWFjaCIsImNsIiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5uZXJIVE1MIiwiY3JlYXRlVGFnV2l0aEF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwicXVlcnlTZWxlY3RvciIsInBsYXllckEiLCJzZWxlY3RlZFNoaXAiLCJsb2FkR3JpZHMiLCJib3giLCJhZGRFdmVudExpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsImNvbnRhaW5zIiwiYXBwZW5kQ2hpbGQiLCJzaGlwUm93cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJrZXlzIiwicm93IiwiaW5kZXgiLCJzaGlwTGVuZ3RoIiwic2hpcERpc3BsYXkiLCJzcXVhcmUiLCJyb3RhdGVCdXR0b24iLCJyZW1vdmUiXSwic291cmNlUm9vdCI6IiJ9