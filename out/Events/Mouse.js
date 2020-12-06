"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Module Imports
const Vectors_1 = require("../Utilities/Vectors");
const Buttons_1 = require("../Utilities/Buttons");
const Node_1 = require("../TreeNodes/Node");
const Preload_1 = require("../Core/Preload");
// Mouse Variables
const mouse = {
    pos: Vectors_1.createVector(),
    isDown: false,
    button: -1,
    timeDown: 0,
    isMoving: false,
    singleClick: false // Single Click State
};
exports.mouse = mouse;
/** Cleans up garbage data
 * Resets Mouse Data that needs to be tracked
 * Resets Secondary Node
 */
function cleanup() {
    // Clean up Mouse Data
    mouse.singleClick = false;
    mouse.isMoving = false;
    // Clean up Secondary Node
    // secondaryNode = null;
}
exports.cleanup = cleanup;
/** Left Click Events launch
 * Create new Node on Add Button Click
*/
function leftClickEvents() {
    // Add Button Click
    if (Buttons_1.addBtn.active) {
        const pos = Vectors_1.createVector(500, 500);
        Preload_1.nodeTree.addNode(pos, Node_1.size);
    }
}
exports.leftClickEvents = leftClickEvents;

//# sourceMappingURL=Mouse.js.map
