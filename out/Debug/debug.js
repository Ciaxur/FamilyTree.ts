"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vectors_1 = require("../Utilities/Vectors");
const Core_1 = require("../Canvas/Core");
const Preload_1 = require("../Core/Preload");
// Debug Mode State Variable
exports.debugMode = false;
/** Draws a Rectangle from the Center
 * @param pos -A Vector for the box
 * @param size -A Size Vector for the box
*/
function drawHitBox(pos, size) {
    Core_1.ctx.beginPath();
    Core_1.ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    Core_1.ctx.rect(pos.x - (size.width / 2), pos.y - (size.height / 2), size.width, size.height);
    Core_1.ctx.fill();
    Core_1.ctx.closePath();
}
exports.drawHitBox = drawHitBox;
/** Draws Debug Info at top left screen */
function drawDebugDetails() {
    /** Draws Text at Given Location */
    function drawText(str, loc) {
        Core_1.ctx.beginPath();
        Core_1.ctx.fillText(str, loc.x, loc.y);
        Core_1.ctx.closePath();
    }
    // Member Data
    let member = Preload_1.nodeTree.activeMember().member;
    let memberID;
    let parents = [];
    let children = [];
    let partners = [];
    let isParent;
    if (member) {
        memberID = member.uniqueID;
        isParent = member.getRelations().isParent;
        for (const p of member.getParents())
            parents.push(p.uniqueID);
        for (const c of member.getChildren())
            children.push(c.uniqueID);
        for (const p of member.getPartners())
            partners.push(p.uniqueID);
    }
    // Top Menu
    Core_1.ctx.save();
    Core_1.ctx.font = "10px";
    Core_1.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    drawText("Debug Menu", Vectors_1.createVector(10 / 2, 20)); // + 15
    drawText(`uniqueID: ${memberID}`, Vectors_1.createVector(10 / 2, 35)); // + 15..
    drawText(`isParent: ${isParent}`, Vectors_1.createVector(10 / 2, 50));
    drawText(`Parents: ${parents}`, Vectors_1.createVector(10 / 2, 65));
    drawText(`Children: ${children}`, Vectors_1.createVector(10 / 2, 80));
    drawText(`Partners: ${partners}`, Vectors_1.createVector(10 / 2, 95));
    Core_1.ctx.restore();
}
exports.drawDebugDetails = drawDebugDetails;
/** Triggers Debug Mode */
function triggerDebugMode() {
    exports.debugMode = !exports.debugMode;
}
exports.triggerDebugMode = triggerDebugMode;

//# sourceMappingURL=debug.js.map
