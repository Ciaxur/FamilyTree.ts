"use strict";
/**
 * All Canvas Drawing Methods and Variables
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Module Imports
const Core_1 = require("./Core");
const Preload_1 = require("../Core/Preload");
const Constants_1 = require("../Core/Constants");
const Vectors_1 = require("../Utilities/Vectors");
const Buttons_1 = require("../Utilities/Buttons");
const Mouse_1 = require("../Events/Mouse");
/** Clears the entire Canvas */
function clearCanvas() {
    Core_1.ctx.clearRect(0, 0, Constants_1.WIDTH, Constants_1.HEIGHT);
}
exports.clearCanvas = clearCanvas;
/** Displays Add Button onto the Canvas
 * Opacity changes based on mouse to btn
 */
function showAddButton() {
    // Check if mouse within btn
    Buttons_1.addBtn.active = Vectors_1.within(Mouse_1.mouse.pos, { width: 0, height: 0 }, Buttons_1.addBtn.pos, { width: Buttons_1.addBtn.radius * 2, height: Buttons_1.addBtn.radius * 2 });
    // Opacity Setup
    let opacity;
    Buttons_1.addBtn.active ? opacity = 1 : opacity = 0.4;
    // Button Properties
    let pallet = {
        c1: `rgba(0, 88, 94, ${opacity})`,
        c2: `rgba(0, 148, 148, ${opacity})`,
        c3: `rgba(245, 242, 220, ${opacity}`
    };
    let PLUS_WIDTH = 2;
    let PLUS_HEIGHT = 15;
    // Background Button
    Core_1.ctx.beginPath();
    Core_1.ctx.strokeStyle = pallet.c2;
    Core_1.ctx.fillStyle = pallet.c1;
    Core_1.ctx.arc(Buttons_1.addBtn.pos.x, Buttons_1.addBtn.pos.y, Buttons_1.addBtn.radius, 0, Math.PI * 2);
    Core_1.ctx.stroke();
    Core_1.ctx.fill();
    Core_1.ctx.beginPath();
    // Plus Button
    Core_1.ctx.beginPath();
    Core_1.ctx.fillStyle = pallet.c3;
    Core_1.ctx.fillRect(Buttons_1.addBtn.pos.x - (PLUS_WIDTH / 2), Buttons_1.addBtn.pos.y - (PLUS_HEIGHT / 2), PLUS_WIDTH, PLUS_HEIGHT);
    Core_1.ctx.fill();
    Core_1.ctx.beginPath();
    Core_1.ctx.beginPath();
    Core_1.ctx.fillStyle = pallet.c3;
    Core_1.ctx.fillRect(Buttons_1.addBtn.pos.x - (PLUS_HEIGHT / 2), Buttons_1.addBtn.pos.y - (PLUS_WIDTH / 2), PLUS_HEIGHT, PLUS_WIDTH);
    Core_1.ctx.fill();
    Core_1.ctx.beginPath();
}
exports.showAddButton = showAddButton;
/** Displays the Garbage for deleting a Node
 * Returns a Boolean for the state of hitbox to node
 */
function showGarbage() {
    let img = Constants_1.GARBAGE.close;
    // Variables
    let offsetY = 10;
    let offsetX = 7;
    let x = img.width;
    let y = Constants_1.HEIGHT - (img.height + offsetY);
    let opacity = 0.6; // Opacity of Diming Overlay
    // Create the Hitbox & Active Member
    let hitbox = Vectors_1.createCenterVector(Vectors_1.createVector(x, y), img);
    let member = Preload_1.nodeTree.activeMember().member;
    let hit = Vectors_1.within(member.getPosition(), member.getSize(), hitbox, img);
    // Check if Active Node is within the hitbox
    if (member && hit) {
        opacity = 1; // Highlight the Garbage
        // Initiate Garbage Open Asset
        img = Constants_1.GARBAGE.open;
        x = img.width - offsetX;
        y = Constants_1.HEIGHT - (img.height + offsetY);
        hitbox = Vectors_1.createCenterVector(Vectors_1.createVector(x, y), img);
    }
    // Draw Garbage Open Asset
    Core_1.ctx.save();
    Core_1.ctx.globalAlpha = opacity;
    Core_1.ctx.drawImage(img, x, y);
    Core_1.ctx.restore();
    // Return if the Garbage and a Node hit
    return hit;
}
exports.showGarbage = showGarbage;

//# sourceMappingURL=Canvas-Draw.js.map
