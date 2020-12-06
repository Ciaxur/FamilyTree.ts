"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Module Init
const $ = require("jquery"); // jQuery Module
const NodeTree_1 = require("../TreeNodes/NodeTree");
const Core_1 = require("../Canvas/Core");
const Node_1 = require("../TreeNodes/Node");
const Assets_1 = require("../Utilities/Assets");
// Electron Init
const remote = require('electron').remote; // Electron Remote Module for controlling current windows
// Variables
const window = remote.getCurrentWindow();
const windowSize = {
    width: window.getSize()[0],
    height: window.getSize()[1]
};
// Close Button
$('#btn-close').on('click', () => {
    window.close();
});
// Minimize Button
$('#btn-min').on('click', () => {
    window.minimize();
});
// Image Properties
$('img').on('dragstart', (event) => {
    event.preventDefault();
});
// Tree Nodes
const nodeTree = new NodeTree_1.NodeTree(Core_1.ctx, Assets_1.initAssets(), Node_1.relationDistance);
exports.nodeTree = nodeTree;

//# sourceMappingURL=Preload.js.map
