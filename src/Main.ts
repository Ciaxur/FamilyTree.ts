/* 
    Author:         Omar Omar
    Date Created:   May 2018
    Description: 
        - Main Program. ALl actions and Canvas Setup.
*/

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
import { nodeTree } from './Core/Preload';
import { linkNodes, handleLinkers, secondaryNode } from './TreeNodes/Linkers';
import { WIDTH, HEIGHT } from './Core/Constants';
import { clearCanvas, showGarbage } from './Canvas/Canvas-Draw';
import { mouse, leftClickEvents } from './Events/Mouse';
import { drawHitBox } from './Debug/debug';
import { main } from './Core/Draw';


// Global Assets
let remove: Boolean;                        // Node Removal State    

/**
 * Draw Function sent into MAIN drawing funciton
 *  - Mainly used for "Development" Build
 *  -"Production" Builds Are written directly into 'Draw.ts'
 */
function draw() {
    // Left Mouse Down Actions
    if (mouse.isDown && mouse.button == 0 || secondaryNode) {
        // Secondary Node's Linkers Moving
        if (secondaryNode) linkNodes();
        // Node Moving (If mouse is moving)
        else if (mouse.isMoving) nodeTree.dragNode(mouse.pos);
        

        // Display Garbage if there is an Active Member
        if (nodeTree.activeMember().member) {
            // Display Garbage Asset at left botton corner
            // Keep track of garbage removal of node
            remove = showGarbage();
        }
        
        mouse.timeDown += 0.01;
    } else if (remove && nodeTree.activeMember().member) {
        nodeTree.removeNode(nodeTree.activeMember().index);
        remove = false;
    }

    // Mouse Single Click Actions
    if (mouse.singleClick) {
        // Left Click
        if (mouse.button == 0) {
            leftClickEvents();
        }
        // Right Click
        else if (mouse.button == 2) {
            // CLICK
        }
    }
}



/** Runs the Canvas
 * Clears the Canvas
 * Calls Second at the End
*/
function runCanvas(): void {
    // Clear Canvas
    clearCanvas();

    
    // Drawing Main Data
    main(draw);

    
    // Animation Frames
    window.requestAnimationFrame(runCanvas);
}

// Program Calls
runCanvas();
