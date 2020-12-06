"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Module Imports
const Constants_1 = require("../Core/Constants");
// HTML5 Cavnas Variables
const canvas = document.getElementById("canvas");
exports.canvas = canvas;
const ctx = canvas.getContext('2d');
exports.ctx = ctx;
// Canvas Setup
ctx.imageSmoothingEnabled = true;
ctx.canvas.width = Constants_1.WIDTH;
ctx.canvas.height = Constants_1.HEIGHT;

//# sourceMappingURL=Core.js.map
