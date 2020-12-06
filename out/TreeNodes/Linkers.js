"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Module Imports
const Vectors_1 = require("../Utilities/Vectors");
const Mouse_1 = require("../Events/Mouse");
const Core_1 = require("../Canvas/Core");
const Preload_1 = require("../Core/Preload");
/** Activates Linkers (Properties)
 * @param member -Active Member
*/
function handleLinkers(member) {
    // Make sure there is a valid member
    if (!member.member)
        return;
    // Find lowest opacity
    let lowestOpacity = 1;
    for (const linker of member.member.getLinkers()) {
        (linker.opacity < lowestOpacity) ? lowestOpacity = linker.opacity : null;
    }
    // Activate Linkers when mouseover
    for (const linker of member.member.getLinkers()) {
        if (Vectors_1.within(Mouse_1.mouse.pos, { width: 0, height: 0 }, linker.pos, { width: linker.radius * 2, height: linker.radius * 2 })) {
            linker.opacity = 1;
            // Set current Active to Secondary
            // Set Active Linker
            if (Mouse_1.mouse.isDown) {
                exports.secondaryNode = member;
                exports.secondaryNode.linker = linker;
            }
        }
        else {
            linker.opacity = lowestOpacity;
        }
    }
}
exports.handleLinkers = handleLinkers;
/** Links and Draws the Linking Nodes of Members
 * Connects the two members when mouse is released if there is another member
 */
function linkNodes() {
    // Variables
    let nodePos = exports.secondaryNode.linker;
    // Keep Linkers Drawn
    exports.secondaryNode.member.drawLinkers();
    // Draw Linking Lines
    Core_1.ctx.beginPath();
    Core_1.ctx.strokeStyle = `rgb(${nodePos.fill})`;
    Core_1.ctx.moveTo(nodePos.pos.x, nodePos.pos.y);
    Core_1.ctx.lineTo(Mouse_1.mouse.pos.x, Mouse_1.mouse.pos.y);
    Core_1.ctx.stroke();
    Core_1.ctx.closePath();
    // Link to member on mouse release
    if (!Mouse_1.mouse.isDown) {
        // Keep track of potential linked member
        // member1 -> Current Node
        // member2 -> Other Node to Link to
        let member1 = exports.secondaryNode.member;
        let member2 = Preload_1.nodeTree.activeMember().member;
        // Make sure there is a member2
        if (member2) {
            // Add Child & Parent Links
            if (nodePos.type == "child") {
                member1.addChild(member2);
                member2.addParent(member1);
            }
            // Add Partner Links
            else if (nodePos.type == "partner") {
                member1.addPartner(member2);
                member2.addPartner(member1);
            }
            // Organize the Node Tree
            Preload_1.nodeTree.organizeNode(member1);
        }
        // Finished with Secondary Node
        exports.secondaryNode = null;
    }
}
exports.linkNodes = linkNodes;

//# sourceMappingURL=Linkers.js.map
