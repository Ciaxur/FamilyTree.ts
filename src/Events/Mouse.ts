// Module Imports
import { createVector, Vector2D } from '../Utilities/Vectors';
import { addBtn } from '../Utilities/Buttons';
import { size } from '../TreeNodes/Node';
import { nodeTree } from '../Core/Preload';


// Mouse Variables
const mouse = {
    pos: createVector(),
    isDown: false,      // Keep track of mouse press state
    button: -1,         // Keeps track of which button was clicked (0 -> Left | 1 -> Middle | 2 -> Right)
    timeDown: 0,        // Amount of time mouse held down
    isMoving: false,    // Mouse Movement
    singleClick: false  // Single Click State
};

/** Cleans up garbage data
 * Resets Mouse Data that needs to be tracked
 * Resets Secondary Node
 */
export function cleanup(): void {
    // Clean up Mouse Data
    mouse.singleClick = false;
    mouse.isMoving = false;

    // Clean up Secondary Node
    // secondaryNode = null;
}

/** Left Click Events launch
 * Create new Node on Add Button Click
*/
export function leftClickEvents(): void {
    // Add Button Click
    if(addBtn.active){
        const pos: Vector2D = createVector(500, 500);
        nodeTree.addNode(pos, size);
    }
}




/**
 * All Exports from Mouse
 */
export {
    mouse
}