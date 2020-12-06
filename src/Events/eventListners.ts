// Imported Variables
import { nodeTree } from '../Core/Preload';
import { canvas } from '../Canvas/Core';
import { triggerDebugMode } from '../Debug/debug';
import { mouse } from './Mouse';


// Global Event Listners
addEventListener("mousemove", event => {
    mouse.pos.x = event.clientX;
    mouse.pos.y = event.clientY;
});

addEventListener("keypress", e => {
    if (e.key.toLowerCase() == 'r') {
        nodeTree.reset();
    } else if (e.key.toLowerCase() == 'd') {
        // DEBUG
        triggerDebugMode();
    }
});

// Canvas Event Listners
canvas.addEventListener("mousedown", e => {
    mouse.button = e.button;
    mouse.isDown = true;
});

canvas.addEventListener("mousemove", e =>{
    mouse.isMoving = true;

    // Check and Set active to Node that mouse is over
    nodeTree.setActiveNode(mouse.pos);
});

canvas.addEventListener("mouseup", e => {
    // console.log(e.button); // HERE THE RIGHT CLICK EVENTS WILL GO (Button == 2)
    if(mouse.timeDown <= 0.05 && mouse.isMoving == false){
        mouse.singleClick = true;
    }

    // Keep Track of Data
    mouse.isDown = false;
    mouse.timeDown = 0;
});