/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.startPoints = exports.side = void 0;\nconst mapGenerator_1 = __webpack_require__(/*! ./modules/mapGenerator */ \"./src/modules/mapGenerator.ts\");\nexports.side = 12;\nexports.startPoints = [\n    { x: 0, y: 0 },\n    { x: 1, y: 0 },\n    { x: 2, y: 0, head: true },\n]; // array points are going to be continous and in a straight horizontal line.\nlet snake = {\n    points: exports.startPoints,\n    length: 3,\n    direction: \"down\",\n};\nconst newPoints = (points, direction) => {\n    const newPoints = structuredClone(points);\n    let newHead = newPoints.slice(-1)[0];\n    let newX = newHead.x;\n    let newY = newHead.y;\n    switch (direction) {\n        case \"right\":\n            newPoints.push({ x: ++newX, y: newY });\n            break;\n        case \"left\":\n            newPoints.push({ x: --newX, y: newY });\n            break;\n        case \"up\":\n            newPoints.push({ x: newX, y: --newY });\n            break;\n        case \"down\":\n            newPoints.push({ x: newX, y: ++newY });\n            break;\n    }\n    newPoints.shift();\n    return newPoints;\n};\nconst checkIfOppositeDirectionInput = (direction) => {\n    switch (direction) {\n        case \"ArrowRight\":\n            return snake.direction === \"left\";\n        case \"ArrowLeft\":\n            return snake.direction === \"right\";\n        case \"ArrowUp\":\n            return snake.direction === \"down\";\n        case \"ArrowDown\":\n            return snake.direction === \"up\";\n    }\n};\nconst checkKey = (key) => {\n    if (checkIfOppositeDirectionInput(key))\n        return undefined;\n    const currentSnake = structuredClone(snake);\n    const pointsOld = currentSnake.points;\n    let nextSnake;\n    switch (key) {\n        case \"ArrowRight\":\n            nextSnake = Object.assign(Object.assign({}, currentSnake), { points: newPoints(pointsOld, \"right\"), direction: \"right\" });\n            break;\n        case \"ArrowLeft\":\n            nextSnake = Object.assign(Object.assign({}, currentSnake), { points: newPoints(pointsOld, \"left\"), direction: \"left\" });\n            break;\n        case \"ArrowUp\":\n            nextSnake = Object.assign(Object.assign({}, currentSnake), { points: newPoints(pointsOld, \"up\"), direction: \"up\" });\n            break;\n        case \"ArrowDown\":\n            nextSnake = Object.assign(Object.assign({}, currentSnake), { points: newPoints(pointsOld, \"down\"), direction: \"down\" });\n            break;\n        default:\n            return undefined;\n    }\n    if (checkIfStepExists(nextSnake)) {\n        return nextSnake;\n    }\n    else\n        return undefined;\n};\nconst checkIfStepExists = (nextSnake) => {\n    const head = nextSnake.points.slice(-1)[0];\n    return !(head.x < 0 ||\n        head.y < 0 ||\n        head.x > exports.side - 1 ||\n        head.y > exports.side - 1);\n};\nconst drawSnake = (newSnake) => {\n    const selected = document.querySelectorAll(\".snake-body\");\n    for (let item of selected)\n        item.removeAttribute(\"class\"); //  remove current snake\n    const newSelectedIds = [];\n    for (const item of newSnake.points)\n        newSelectedIds.push(`${item.x} ${item.y}`);\n    for (let i = 0; i < newSelectedIds.length; i++) {\n        let obj = document.getElementById(newSelectedIds[i]);\n        obj === null || obj === void 0 ? void 0 : obj.setAttribute(\"class\", `snake-body ${i === newSelectedIds.length - 1 ? \"snake-head\" : \"\"}`);\n    }\n};\nconst changeDirection = (e) => {\n    if (checkIfOppositeDirectionInput(e.key))\n        return undefined;\n    switch (e.key) {\n        case \"ArrowRight\":\n            snake.direction = \"right\";\n            break;\n        case \"ArrowLeft\":\n            snake.direction = \"left\";\n            break;\n        case \"ArrowUp\":\n            snake.direction = \"up\";\n            break;\n        case \"ArrowDown\":\n            snake.direction = \"down\";\n            break;\n    }\n};\nconst autoWalk = () => {\n    let key = \"\";\n    switch (snake.direction) {\n        case \"right\":\n            key = \"ArrowRight\";\n            break;\n        case \"left\":\n            key = \"ArrowLeft\";\n            break;\n        case \"down\":\n            key = \"ArrowDown\";\n            break;\n        case \"up\":\n            key = \"ArrowUp\";\n            break;\n    }\n    const newSnake = checkKey(key);\n    if (!newSnake)\n        return;\n    snake = newSnake;\n    drawSnake(snake);\n};\n(0, mapGenerator_1.drawInitialMap)();\nwindow.addEventListener(\"keydown\", changeDirection);\nsetInterval(autoWalk, 500);\n\n\n//# sourceURL=webpack://saanp/./src/index.ts?");

/***/ }),

/***/ "./src/modules/mapGenerator.ts":
/*!*************************************!*\
  !*** ./src/modules/mapGenerator.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.drawInitialMap = void 0;\nconst index_1 = __webpack_require__(/*! ../index */ \"./src/index.ts\");\nconst drawInitialMap = () => {\n    let container = document === null || document === void 0 ? void 0 : document.getElementById(\"map\");\n    // start points are in a straight horizontal line\n    // this will find the range of x for that y in which the initial snake exists\n    // these variables are for drawing the snake\n    let initialY = index_1.startPoints[0].y; // !could change, need improvements later\n    let snakeHeadXValue = 0;\n    let intialRangeOfX = index_1.startPoints.map((item) => {\n        if (item.head)\n            snakeHeadXValue = item.x;\n        return item.x;\n    });\n    for (let i = 0; i < index_1.side; i++) {\n        for (let j = 0; j < index_1.side; j++) {\n            let block = document.createElement(\"div\");\n            block.setAttribute(\"id\", `${j} ${i}`); // keep in mind j denotes x and i denotes y\n            // this part if for drawing the snake\n            if (i === initialY && intialRangeOfX.indexOf(j) !== -1) {\n                block.classList.add(\"snake-body\");\n                if (j === snakeHeadXValue)\n                    block.classList.add(\"snake-head\");\n            }\n            container === null || container === void 0 ? void 0 : container.appendChild(block);\n        }\n    }\n};\nexports.drawInitialMap = drawInitialMap;\n\n\n//# sourceURL=webpack://saanp/./src/modules/mapGenerator.ts?");

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
/******/ 			// no module.id needed
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;