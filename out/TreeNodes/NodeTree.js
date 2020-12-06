"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Module Imports */
const Node_1 = require("./Node");
const Vectors_1 = require("../Utilities/Vectors");
/** Node Tree Class holds a "Tree" of Node Members
 * Has various methods to perform on EACH Node member
*/
class NodeTree {
    /** Default Constructor
     * Initiates Canvas Context 2D and Relation Distance to Connect with other Nodes
     * Requires the Image Source to be Loaded
     * @param canvasContext -Canvas Rendering Context2D used to draw onto Canvas
     * @param assets -An Assets object that has all the image assets required
     * @param relationDistance -The required distance from the related Node in order to stay connected to
    */
    constructor(canvasContext, assets, relationDistance) {
        // Assigning Variables
        this.ctx = canvasContext;
        this.relationDist = relationDistance; // Required distance to another node to cause a Connection
        this.nodes = [];
        // Initiate Active Node
        this.resetActiveNode(); // No Nodes yet
        // Assets Setup
        this.assets = assets;
    }
    /** Adds a new Node member to Tree
     * Requires an initial Location to add member to (Vector2D Style)
     * Requires a size (Size2D Style)
    */
    addNode(loc, size) {
        let pos = Vectors_1.createVector(loc.x, loc.y);
        this.nodes.push(new Node_1.NodeMember(this.ctx, this.assets.core, pos, size, this.relationDist));
    }
    /** Removes Node based on Index Parameter
     * @param index -Index of Node in array
    */
    removeNode(index) {
        // Set security code
        if (index < 0 || index >= this.nodes.length || index == undefined)
            return;
        // Remove the node from the array
        this.nodes.splice(index, 1);
    }
    /** Moves Node members around
     * Depending on where the Mouse's Position is, is where the Node will move
     * Only moves the Active Node
     */
    dragNode(mousePos) {
        // Check if there are any active nodes
        if (this.activeNode.member) {
            // Make a copy of mouse Vector
            let pos = mousePos.copy();
            // Calculate the change in Vector
            // Get the Node Position Reference
            let delta = pos.copy();
            delta.sub(this.activeNode.startingPos);
            let nodePos = this.activeNode.member.getPosition();
            // Accumulate the Vector according to mouse's delta
            nodePos.add(delta);
            // Reset the starting position of the Node
            this.activeNode.startingPos = pos;
        }
    }
    /** Sets the Node that the mouse is over to Active
     * Depending on where the mousePos is -> Activate a Node
    */
    setActiveNode(mousePos) {
        for (let x = 0; x < this.nodes.length; x++) {
            if (this.nodes[x].onNode(mousePos.copy())) {
                this.activeNode.member = this.nodes[x]; // Assign the Active Member based on Mouse Location
                this.activeNode.index = x; // Keep track of the index node is in
                this.activeNode.startingPos = mousePos.copy(); // Starting Mouse Position
                this.activeNode.member.setHighlight(true); // Turn on Hightlight
                return;
            }
        }
        this.resetActiveNode(); // If non found -> Nullify Active
    }
    /** Sets the active Linker of current Node
     * @param linker -Linker that will be set to the current active node
    */
    setActiveLinker(linker) {
        this.activeNode.linker = linker;
    }
    /** Draws and Updates each Node Member */
    run() {
        for (const node of this.nodes)
            node.update(); // Update First (Because of linkers underneath the node)
        for (const node of this.nodes)
            node.draw(); // Then Draw
        // Display Properties of Active Node
        if (this.activeNode.member) {
            this.activeNode.member.drawLinkers();
        }
        // Organize Active Node
        if (this.activeNode.member) {
            this.organizeNode(this.activeNode.member);
        }
    }
    /** Organizes Nodes Based on Parents to Children
     * @param parent The Member that will be organized
    */
    organizeNode(parent) {
        // For Performace, Make sure parent has children before
        // creating any variables
        if (!parent.hasChildren())
            return;
        // Variables
        let space = parent.getSize().width; // Space between each node
        let children = parent.getChildren(); // Parent's Children
        let parentPos = parent.getPosition(); // Parent's Vector2D Position
        // Calculation Offset Value
        // Offset is based on the number of GrandChildren
        let offsetValue = 0; // Offset Value of spaces between nodes
        for (const child of children) {
            let grandChildren = child.getChildren();
            offsetValue += grandChildren.length;
        }
        offsetValue *= 0.8; // Offset Value 
        // X-Offset
        let Xoffset = space * offsetValue; // Overall Offset Variable
        // Y-Offset
        let Yoffset = 1.2;
        // Get a Midpoint for the Children
        let midpoint = children.length / 2; // Middle point of Children's Length
        // Calculate the starting Point X
        let x = parentPos.x - (Xoffset * Math.floor(midpoint)); // Offset of Parent's Position
        x -= (space * Math.floor(midpoint)); // Apply the Spacing of Nodes
        // Calculate the starting Point Y
        let y = parentPos.y + (space * Yoffset); // Y position of each Child Node from Parent
        // Create the Starting Point
        let pos = Vectors_1.createVector(x, y);
        // Offset If Children Number is Even (Keeps the Nodes more Center)
        if (!(children.length % 2)) {
            pos.x += (space + Xoffset) / 2;
        }
        // Set Children's New Positions
        for (let x = 0; x < children.length; x++) {
            // Set Position
            children[x].setPosition(pos);
            // Go to next Position
            pos = pos.copy();
            pos.x += space + Xoffset;
        }
        // Continue Organizing Down the Tree
        for (const child of children)
            this.organizeNode(child);
    }
    /** Resets the Node Members Array */
    reset() {
        this.nodes = [];
    }
    /** Returns the current Active Node Object */
    activeMember() {
        return this.activeNode;
    }
    /** Resets Active Node to Default */
    resetActiveNode() {
        // Turn off Highlight Node State
        if (this.activeNode && this.activeNode.member)
            this.activeNode.member.setHighlight(false);
        // Reset Active Node
        this.activeNode = {
            member: undefined,
            index: undefined,
            linker: undefined,
            startingPos: undefined
        };
    }
}
exports.NodeTree = NodeTree;

//# sourceMappingURL=NodeTree.js.map
