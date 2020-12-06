"use strict";
/*
    Author:         Omar Omar
    Date Created:   May 2018
    Description:
        - Main Program. ALl actions and Canvas Setup.
*/
Object.defineProperty(exports, "__esModule", { value: true });
/*
    To Do:
        - (FUTURE) Make the x-offset of organizeNode to be adaptable based on the DISTANCE from the neighbor node
            - Would effect UP the tree, so if a grandchild was near a neighbor node from another cousin then the x-offset would change
                to fit the required DISTANCE between each neighbor node
        - Add Partners Offset to organizeNode
        - Add second "Add Members" Window that will create a Node tree with parameters entered
            - Grandparents: "names..."
            - Parents: "names..."
            - Children: "names..."
            - If no Grandparents... (Don't add em)
            - etc...
        - Add Simple ctx Tasks to a Utility file
        - Modify relationDistance to be Adaptive to tree size
        - Fix clipping issue where if one Node is selected and overlays another, the other will be selected
        - Fix Linker issue when moving nodes it overrides onto Linkers
        - Add ability to detect Node Layer ontop of another Node
        - Add ability to detect if Properties are clicked on the Active Node (Remider: Mouse Move sets the Active Node)
        - Add image onload to start (return a boolean when loaded from Node or NodeTree?)
        - Add Ability to save progress
        - Improve Performance by TIMING functions that run EACH loop
        - Refactor Most of Canvas.ts functions into NodeTree.ts
        - Fix issue, Node Property shows OVER the other node if two nodes overlay
            - (Draw the node THEN the properties in a loop)
        - Fix Mouse Click
            - Use the Click event?
            - The Plus Button isn't THAT responsive
        - Expand / Re-Create Linkers
            - Move them out the way?
            - MAKE THE HITBOX LARGER!!
    
    Working On:
        - Add Canvas Scrolling (with right-mouse drag)
*/
// Module Imports
// import { ctx, canvas } from './Canvas/Core';
const Preload_1 = require("./Core/Preload");
const Linkers_1 = require("./TreeNodes/Linkers");
const Canvas_Draw_1 = require("./Canvas/Canvas-Draw");
const Mouse_1 = require("./Events/Mouse");
const Draw_1 = require("./Core/Draw");
// Global Assets
let remove; // Node Removal State    
/**
 * Draw Function sent into MAIN drawing funciton
 *  - Mainly used for "Development" Build
 *  -"Production" Builds Are written directly into 'Draw.ts'
 */
function draw() {
    // Left Mouse Down Actions
    if (Mouse_1.mouse.isDown && Mouse_1.mouse.button == 0 || Linkers_1.secondaryNode) {
        // Secondary Node's Linkers Moving
        if (Linkers_1.secondaryNode)
            Linkers_1.linkNodes();
        // Node Moving (If mouse is moving)
        else if (Mouse_1.mouse.isMoving)
            Preload_1.nodeTree.dragNode(Mouse_1.mouse.pos);
        // Display Garbage if there is an Active Member
        if (Preload_1.nodeTree.activeMember().member) {
            // Display Garbage Asset at left botton corner
            // Keep track of garbage removal of node
            remove = Canvas_Draw_1.showGarbage();
        }
        Mouse_1.mouse.timeDown += 0.01;
    }
    else if (remove && Preload_1.nodeTree.activeMember().member) {
        Preload_1.nodeTree.removeNode(Preload_1.nodeTree.activeMember().index);
        remove = false;
    }
    // Mouse Single Click Actions
    if (Mouse_1.mouse.singleClick) {
        // Left Click
        if (Mouse_1.mouse.button == 0) {
            Mouse_1.leftClickEvents();
        }
        // Right Click
        else if (Mouse_1.mouse.button == 2) {
            // CLICK
        }
    }
}
/** Runs the Canvas
 * Clears the Canvas
 * Calls Second at the End
*/
function runCanvas() {
    // Clear Canvas
    Canvas_Draw_1.clearCanvas();
    // Drawing Main Data
    Draw_1.main(draw);
    // Animation Frames
    window.requestAnimationFrame(runCanvas);
}
// Program Calls
runCanvas();

//# sourceMappingURL=Main.js.map
