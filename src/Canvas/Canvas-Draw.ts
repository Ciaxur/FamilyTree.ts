/**
 * All Canvas Drawing Methods and Variables
 */

// Module Imports
import { ctx } from './Core';
import { nodeTree } from '../Core/Preload';
import { WIDTH, HEIGHT, GARBAGE } from '../Core/Constants';
import { within, createVector, createCenterVector } from '../Utilities/Vectors';
import { addBtn } from '../Utilities/Buttons';
import { mouse } from '../Events/Mouse';



 /** Clears the entire Canvas */
export function clearCanvas(): void {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

/** Displays Add Button onto the Canvas
 * Opacity changes based on mouse to btn
 */
export function showAddButton(): void {
    // Check if mouse within btn
    addBtn.active = within(mouse.pos, {width:0, height:0} , addBtn.pos, {width: addBtn.radius*2, height: addBtn.radius*2});

    // Opacity Setup
    let opacity;
    addBtn.active ? opacity = 1 : opacity = 0.4;
    
    // Button Properties
    let pallet = {
        c1: `rgba(0, 88, 94, ${opacity})`,
        c2: `rgba(0, 148, 148, ${opacity})`,
        c3: `rgba(245, 242, 220, ${opacity}`
    };
    
    let PLUS_WIDTH = 2;
    let PLUS_HEIGHT = 15;


    // Background Button
    ctx.beginPath();
    ctx.strokeStyle = pallet.c2;
    ctx.fillStyle = pallet.c1;
    ctx.arc(addBtn.pos.x, addBtn.pos.y, addBtn.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();

    // Plus Button
    ctx.beginPath();
    ctx.fillStyle = pallet.c3;
    ctx.fillRect(addBtn.pos.x - (PLUS_WIDTH / 2), addBtn.pos.y - (PLUS_HEIGHT / 2), PLUS_WIDTH, PLUS_HEIGHT);
    ctx.fill();
    ctx.beginPath();

    ctx.beginPath();
    ctx.fillStyle = pallet.c3;
    ctx.fillRect(addBtn.pos.x - (PLUS_HEIGHT / 2), addBtn.pos.y - (PLUS_WIDTH / 2), PLUS_HEIGHT, PLUS_WIDTH);
    ctx.fill();
    ctx.beginPath();
}

/** Displays the Garbage for deleting a Node 
 * Returns a Boolean for the state of hitbox to node
 */
export function showGarbage(): Boolean {
    let img = GARBAGE.close;

    // Variables
    let offsetY = 10;
    let offsetX = 7;
    let x = img.width;
    let y = HEIGHT - (img.height + offsetY);
    let opacity = 0.6;  // Opacity of Diming Overlay
    
    
    // Create the Hitbox & Active Member
    let hitbox = createCenterVector(createVector(x, y), img);
    let member = nodeTree.activeMember().member;
    let hit = within(member.getPosition(), member.getSize(), hitbox, img)

    // Check if Active Node is within the hitbox
    if(member && hit){
        opacity = 1; // Highlight the Garbage

        // Initiate Garbage Open Asset
        img = GARBAGE.open;
        x = img.width - offsetX;
        y = HEIGHT - (img.height + offsetY);
        hitbox = createCenterVector(createVector(x, y), img);
    }

    // Draw Garbage Open Asset
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.drawImage(img, x, y);
    ctx.restore();

    // Return if the Garbage and a Node hit
    return hit;
}