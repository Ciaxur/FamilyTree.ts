import { Vector2D, createVector } from '../Utilities/Vectors';
import { Size2D } from '../Utilities/interfaces';
import { ctx } from '../Canvas/Core';
import { nodeTree } from '../Core/Preload';

// Debug Mode State Variable
export let debugMode = false;


/** Draws a Rectangle from the Center
 * @param pos -A Vector for the box
 * @param size -A Size Vector for the box
*/
export function drawHitBox(pos: Vector2D, size: Size2D): void{
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.rect(pos.x-(size.width/2), pos.y-(size.height/2), size.width, size.height);
    ctx.fill();
    ctx.closePath();
}

/** Draws Debug Info at top left screen */
export function drawDebugDetails(): void {
    /** Draws Text at Given Location */
    function drawText(str: string, loc: Vector2D): void {
        ctx.beginPath();
        ctx.fillText(str, loc.x, loc.y);
        ctx.closePath();
    }

    // Member Data
    let member = nodeTree.activeMember().member;
    let memberID;
    let parents = [];
    let children = [];
    let partners = [];
    let isParent;
    

    if(member){
        memberID = member.uniqueID;
        isParent = member.getRelations().isParent;

        for(const p of member.getParents())  parents.push(p.uniqueID);
        for(const c of member.getChildren()) children.push(c.uniqueID);
        for(const p of member.getPartners()) partners.push(p.uniqueID);
    }


    // Top Menu
    ctx.save();
    ctx.font = "10px";
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    drawText("Debug Menu",                      createVector(10/2, 20));    // + 15
    drawText(`uniqueID: ${memberID}`,           createVector(10/2, 35));    // + 15..
    drawText(`isParent: ${isParent}`,           createVector(10/2, 50));
    drawText(`Parents: ${parents}`,             createVector(10/2, 65));
    drawText(`Children: ${children}`,           createVector(10/2, 80));
    drawText(`Partners: ${partners}`,           createVector(10/2, 95));
    ctx.restore();
}

/** Triggers Debug Mode */
export function triggerDebugMode() {
    debugMode = !debugMode;
}