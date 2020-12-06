// Module Init
import * as $ from 'jquery'; // jQuery Module
import { NodeTree } from '../TreeNodes/NodeTree';
import { ctx } from '../Canvas/Core';
import { relationDistance } from '../TreeNodes/Node';
import { initAssets } from '../Utilities/Assets';

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
$('img').on('dragstart', (event) => { // Prevent image draging
    event.preventDefault();
});


// Tree Nodes
const nodeTree: NodeTree = new NodeTree(ctx, initAssets(), relationDistance);

export {
    nodeTree
};