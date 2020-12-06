"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// // Module Imports
const Preload_1 = require("../Core/Preload");
const Canvas_Draw_1 = require("../Canvas/Canvas-Draw");
const Mouse_1 = require("../Events/Mouse");
const Linkers_1 = require("../TreeNodes/Linkers");
const debug_1 = require("../Debug/debug");
/**
 * Main Canvas Drawing
 * @param fn Function passed through to run additional draws (Optional)
 */
function main(fn) {
    // Run the Nodes
    Preload_1.nodeTree.run();
    // 'Main.ts' Function Draw
    fn();
    // Display the Add Button
    Canvas_Draw_1.showAddButton();
    // Variable Cleanup
    Mouse_1.cleanup();
    // Handle Member Linkers (Properties)
    Linkers_1.handleLinkers(Preload_1.nodeTree.activeMember());
    // DEBUG AREA
    if (debug_1.debugMode)
        debug_1.drawDebugDetails();
}
exports.main = main;

//# sourceMappingURL=Draw.js.map
