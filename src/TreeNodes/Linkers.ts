// Module Imports
import { within } from '../Utilities/Vectors';
import { mouse } from '../Events/Mouse';
import { ctx } from '../Canvas/Core';
import { nodeTree } from '../Core/Preload';
import { ActiveNode } from '../Utilities/interfaces';

// Linker Members
export let secondaryNode: ActiveNode;


/** Activates Linkers (Properties)
 * @param member -Active Member
*/
export function handleLinkers(member: ActiveNode): void {
    // Make sure there is a valid member
    if(!member.member) return;

    // Find lowest opacity
    let lowestOpacity = 1;
    for(const linker of member.member.getLinkers()){
        (linker.opacity < lowestOpacity) ? lowestOpacity = linker.opacity : null;
    }

    // Activate Linkers when mouseover
    for(const linker of member.member.getLinkers()){
        if(within(mouse.pos, {width:0, height:0}, linker.pos, {width: linker.radius*2, height: linker.radius*2})){
            linker.opacity = 1;

            // Set current Active to Secondary
            // Set Active Linker
            if(mouse.isDown){
                secondaryNode = member;
                secondaryNode.linker = linker;
            }
        }else{
            linker.opacity = lowestOpacity;
        }
    }
}

/** Links and Draws the Linking Nodes of Members
 * Connects the two members when mouse is released if there is another member
 */
export function linkNodes(): void {
    // Variables
    let nodePos = secondaryNode.linker;

    // Keep Linkers Drawn
    secondaryNode.member.drawLinkers();

    // Draw Linking Lines
    ctx.beginPath();
    ctx.strokeStyle = `rgb(${nodePos.fill})`;
    ctx.moveTo(nodePos.pos.x, nodePos.pos.y);
    ctx.lineTo(mouse.pos.x, mouse.pos.y);
    ctx.stroke();
    ctx.closePath();

    // Link to member on mouse release
    if(!mouse.isDown){
        // Keep track of potential linked member
        // member1 -> Current Node
        // member2 -> Other Node to Link to
        let member1 = secondaryNode.member;
        let member2 = nodeTree.activeMember().member;

        // Make sure there is a member2
        if(member2){
            // Add Child & Parent Links
            if(nodePos.type == "child"){
                member1.addChild(member2);
                member2.addParent(member1);
            }
            // Add Partner Links
            else if(nodePos.type == "partner"){
                member1.addPartner(member2);
                member2.addPartner(member1);
            }

            // Organize the Node Tree
            nodeTree.organizeNode(member1);
        }

        // Finished with Secondary Node
        secondaryNode = null;
    }
}