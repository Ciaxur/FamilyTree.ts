"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imported Variables
const Preload_1 = require("../Core/Preload");
const Core_1 = require("../Canvas/Core");
const debug_1 = require("../Debug/debug");
const Mouse_1 = require("./Mouse");
// Global Event Listners
addEventListener("mousemove", event => {
    Mouse_1.mouse.pos.x = event.clientX;
    Mouse_1.mouse.pos.y = event.clientY;
});
addEventListener("keypress", e => {
    if (e.key.toLowerCase() == 'r') {
        Preload_1.nodeTree.reset();
    }
    else if (e.key.toLowerCase() == 'd') {
        // DEBUG
        debug_1.triggerDebugMode();
    }
});
// Canvas Event Listners
Core_1.canvas.addEventListener("mousedown", e => {
    Mouse_1.mouse.button = e.button;
    Mouse_1.mouse.isDown = true;
});
Core_1.canvas.addEventListener("mousemove", e => {
    Mouse_1.mouse.isMoving = true;
    // Check and Set active to Node that mouse is over
    Preload_1.nodeTree.setActiveNode(Mouse_1.mouse.pos);
});
Core_1.canvas.addEventListener("mouseup", e => {
    // console.log(e.button); // HERE THE RIGHT CLICK EVENTS WILL GO (Button == 2)
    if (Mouse_1.mouse.timeDown <= 0.05 && Mouse_1.mouse.isMoving == false) {
        Mouse_1.mouse.singleClick = true;
    }
    // Keep Track of Data
    Mouse_1.mouse.isDown = false;
    Mouse_1.mouse.timeDown = 0;
});

//# sourceMappingURL=eventListners.js.map
