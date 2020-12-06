// Interface Imports
import { Size2D, Linker, NodeRelation } from '../Utilities/interfaces';
import { Vector2D, createVector, dist, within } from '../Utilities/Vectors';
import { WIDTH } from '../Core/Constants';

// Node Properties
export const relationDistance = WIDTH;             // Distance required to connect to related Node
export const size: Size2D = {
    width: 80,
    height: 80
};


/** Node Member Class
 * Contains data each Member should have
 * Each member has a Unique ID and Relation to other members
 */
export class NodeMember {
    // Public Variables
    public uniqueID: string;
    
    // Private Variables
    private ctx: CanvasRenderingContext2D;
    private img: HTMLImageElement;
    private pos: Vector2D;
    private size: Size2D;
    private linkers: Linker[];
    private relation: NodeRelation;


    /** Default Constructor
     * @constructor Initializes All required Elements
     * @param canvasContext CanvasRenderingContext2D used to draw
     * @param image Node Image Asset
     * @param loc A Vector2D Object for the Node's Location to be drawn
     * @param size A Size2D Object for the Node's Asset Size
     * @param relDist The Distance required to connect to another Node Member
    */
    constructor(canvasContext: CanvasRenderingContext2D, image: HTMLImageElement, loc: Vector2D, size: Size2D, relDist: number){
        // Node Unique Data
        this.uniqueID = ID();

        // Assigning Variables
        this.ctx = canvasContext;
        this.img = new Image();
        this.pos = loc;
        this.size = size;
        this.img = image;
        
        // Node Relation Data
        this.relation = { 
            attatchAtDist: relDist, 
            children: [], 
            parents: [], 
            isParent: false, 
            partners: [],
            highlightNodes: false
        };

        // Initiate Linkers
        this.initLinkers();
    }
    
    /** Checks if the position is inside the node's parameters
     * @param pos A Vector2D for the location that will be tested onto current Node member
     * @returns Returns a Boolean based on the state of position in relation to current Node location
     */ 
    public onNode(pos: Vector2D): Boolean {
        return within(pos, { width: 0, height:0 }, this.pos, this.size);
    }

    /** Draws the image onto the canvas */
    public draw(): void {
        // Draw the Node Image
        this.ctx.drawImage(this.img, this.pos.x - (this.size.height / 2), this.pos.y - (this.size.height / 2), this.size.width, this.size.height);
    }

    /** Updates Data for Node */
    public update(): void {
        // Display the Connections to secondary Node
        this.drawRelation();

        // Set Parent State
        this.relation.isParent = Boolean(this.relation.children.length);
    }

    /** Checks if Node has any Parents (true/false)
     * @returns Returns true if Parents length > 0
     * @returns Returns false if Parents length is 0
    */
    public hasParent(): Boolean {
        if(this.relation.parents.length > 0) return true;
        else return false;
    }

    /** Checks if Node has any Children (true/false)
     * @returns Returns true if Children length > 0
     * @returns Returns false if Children length is 0
    */
    public hasChildren(): Boolean {
        if(this.relation.children.length > 0) return true;
        else return false;
    }

    /** Check if Node is a Parent
     * @returns Boolean if Parent
     */
    public isParent(): Boolean {
        return this.relation.isParent;
    }

    /** Adds a Parent to current Node 
     * @param parent -Parent of Node
    */
    public addParent(parent: NodeMember): void {
        // Make sure it's unique
        // A parent can't be the child nor the partner as well
        if(!this.isUnique(parent, "all")) return;

        // Make sure not to add Node to itself
        if(parent.uniqueID != this.uniqueID)
            this.relation.parents.push(parent);
    }

    /** Adds a Child to current Node 
     * @param child -Child of Node
    */
    public addChild(child: NodeMember): void {
        // Make sure it's unique
        // A child can't be the parent nor the partner as well
        if(!this.isUnique(child, "all")) return;

        // Make sure not to add Node to itself
        if(child.uniqueID != this.uniqueID)
            this.relation.children.push(child);
    }
    
    /** Adds a Partner to current Node
     * Adds partner to Relation
     * @param partner The Partner of current Node
     */
    public addPartner(partner: NodeMember): void {
        // Make sure it's unique
        if(!this.isUnique(partner, "all")) return;
        
        // Make sure not to add Itself
        if(partner.uniqueID != this.uniqueID){
            this.relation.partners.push(partner);
        }
    }

    /** Removes Parents based on uniqueID 
     * @param parentID Parent Node's Unique ID
    */
    public removeParent(parentID: string): void {
        for(let x=0; x < this.relation.parents.length; x++) {
            if(this.relation.parents[x].uniqueID == parentID){
                this.relation.parents.splice(x, 1);
            }
        }
    }

    /** Removes Partner based on uniqueID 
     * @param partnerID The Unique ID of Partner Node
    */
    public removePartner(partnerID: string): void {
        for(let x=0; x < this.relation.partners.length; x++) {
            if(this.relation.partners[x].uniqueID == partnerID){
                this.relation.partners.splice(x, 1);
            }
        }
    }

    /** Displays the Paths to Children Nodes
     * Draws Connection line between Children and Parents
     * Draws Connection line between Partners
    */
    private drawRelation(): void {
        // Assign the Linkers
        const CHILD_CLR         = this.linkers[2].fill;
        const PARTNER_CLR       = this.linkers[0].fill;
        const HIGHLIGHT_CLR     = "rgba(255, 255, 255, 0.6)";

        // Varialbes
        const topSpace          = this.size.height * 0.7; // Space over each node for the line to curve in



        // Draw Relation from Parent to Child & Remove if seperated
        for (let x = 0; x < this.relation.children.length; x++) {
            // Get Child Node Position
            let node = this.relation.children[x].getPosition();

            // Highlighted Tree Branch Line
            if(this.relation.highlightNodes){
                this.ctx.lineWidth = 5;
                this.ctx.strokeStyle = HIGHLIGHT_CLR;
                drawTreeBranch(this.pos, node, topSpace, this.ctx);
            }

            // Draw Tree Branch Line
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = `rgb(${CHILD_CLR})`;
            drawTreeBranch(this.pos, node, topSpace, this.ctx);


            // Check if the Node connection is far to break the chain
            if (dist(this.pos.x, this.pos.y, node.x, node.y) > this.relation.attatchAtDist) {
                this.relation.children[x].removeParent(this.uniqueID);  // Remove Parent from Child
                this.relation.children.splice(x, 1);                    // Break the chain of this child
            }
        }

        // Draw Relation from Partner to Partner & Remove if seperated
        for (let x=0; x<this.relation.partners.length; x++) {
            // Get Partner Node Positions
            let node = this.relation.partners[x].getPosition();

            // Highlighted Line
            if(this.relation.highlightNodes){
                this.ctx.lineWidth = 4;
                this.ctx.strokeStyle = HIGHLIGHT_CLR;
                drawLine(this.pos, node, this.ctx);
            }

            // Draw Path
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = `rgb(${PARTNER_CLR})`;
            drawLine(this.pos, node, this.ctx);

            // Check if Node connect is far to break chain
            if((dist(this.pos.x, this.pos.y, node.x, node.y) > this.relation.attatchAtDist)){
                this.relation.partners[x].removePartner(this.uniqueID);
                this.relation.partners.splice(x, 1);
            }
        }
    }

    /** Draws the Node's Properties
     * Displays circles where linking properties are located
    */
    public drawLinkers(): void {// Manually Setup Linkers Data
        this.linkers[0].pos.x = this.pos.x - (this.size.width / 3);
        this.linkers[0].pos.y = this.pos.y;
        this.linkers[1].pos.x = this.pos.x + (this.size.width / 3);
        this.linkers[1].pos.y = this.pos.y;
        this.linkers[2].pos.x = this.pos.x;
        this.linkers[2].pos.y = this.pos.y + (this.size.height / 4 + 5);


        // Draw Linkers
        this.ctx.lineWidth = 1;

        for (let x=0; x<this.linkers.length; x++) {
            this.ctx.beginPath();

            this.ctx.strokeStyle    = `rgba(${this.linkers[x].stroke}, ${this.linkers[x].opacity})`;
            this.ctx.fillStyle      = `rgba(${this.linkers[x].fill}, ${this.linkers[x].opacity})`;

            this.ctx.arc(this.linkers[x].pos.x, this.linkers[x].pos.y, this.linkers[x].radius, 0, Math.PI * 2);

            this.ctx.stroke();
            this.ctx.fill();

            this.ctx.beginPath();
        }
    }

    /** Initializes the Linkers' basic properties */
    private initLinkers(): void {
        // Initialize the Linkers as an array
        this.linkers = [];

        // 3 Linkers
        // Location setup in drawLinkers
        this.linkers.push({             // Partner1
            pos: createVector(),
            radius: 3,
            type: "partner",
            fill: "245, 242, 220",
            opacity: 0.2,
            stroke: "0, 88, 94"
        });

        this.linkers.push({             // Partner2
            pos: createVector(),
            radius: 3,
            type: "partner",
            fill: "245, 242, 220",
            opacity: 0.2,
            stroke: "0, 88, 94"
        });

        this.linkers.push({             // Child
            pos: createVector(),
            radius: 2,
            type: "child",
            fill: "0, 88, 94",
            opacity: 0.2,
            stroke: "0, 88, 94"
        });
    }

    
    /** Checks if Node is a Unique Related Node based on Type
     * Loops through all Related Nodes making sure not the same one
     * @param node Node Member that will be checked to all Related Nodes
     * @param type Type of Node Member to Check ("child" | "parent" | "partner" | "all")
     * @returns A Boolean if the node is Unique
    */
    private isUnique(node: NodeMember, type: string): Boolean {
        // Check Children
        if(type == "child" || type == "all"){
            for (let x=0; x<this.relation.children.length; x++) {
                if(this.relation.children[x].uniqueID == node.uniqueID){
                    return false;
                }
            }
        }

        // Check Partner
        if(type == "partner" || type == "all"){
            for (let x=0; x<this.relation.partners.length; x++) {
                if (this.relation.partners[x].uniqueID == node.uniqueID){
                    return false;
                }
            }
        }

        // Check Parent
        if(type == "parent" || type == "all"){
            for (let x=0; x<this.relation.parents.length; x++) {
                if (this.relation.parents[x].uniqueID == node.uniqueID){
                    return false;
                }
            }
        }

        return true;
    }
    
/* Setters and Getters */
    /** Sets the Position of the Node 
     * @param pos A Vector2D Location to where to place current Node
     */ 
    public setPosition(pos: Vector2D): void {
        this.pos = pos;
    }

    /** Sets the Size of the Node 
     * @param size A Size2D Object to set Node's size property
    */
    public setSize(size: Size2D): void {
        this.size = size;
    }

    /** Sets the Highlight State of Relation Nodes
     * @param state Highlight Nodes (true/false)
     */
    public setHighlight(state: Boolean): void {
        this.relation.highlightNodes = state;
    }


    /** Returns the current Position of the Node 
     * @returns Current Position of the Node
    */
    public getPosition(): Vector2D {
        return this.pos;
    }

    /** Returns the current Size of the Node 
     * @returns Size2D Object of the current Node's
    */
    public getSize(): Size2D {
        return this.size;
    }

    /** Returns Linkers Object Array for Node 
     * @returns Linkers Object Array for current Node
    */
    public getLinkers(): Linker[] {
        return this.linkers;
    }

    /** Returns Children of Node 
     * @returns Children Nodes Array
    */
    public getChildren(): NodeMember[] {
        return this.relation.children;
    }

    /** Returns Parents of Node 
     * @returns Parent Nodes Array
    */
    public getParents(): NodeMember[] {
        return this.relation.parents;
        }

    /** Returns Partners of Node 
         * @returns Partner Nodes Array
        */
    public getPartners(): NodeMember[] {
        return this.relation.partners;
        }

    /** Returns the Relation Object 
         * @returns Relation Object of Node
        */
    public getRelations(): NodeRelation {
        return this.relation;
    }
}

/** Generates and Returns a Unique String ID 
 * @returns A Unique String ID
*/
function ID() {
    return '_' + Math.random().toString(32).substr(2, 9);
}

/** Draws a Line from a Vector to another 
 * @param vec1 First Vector2D Object
 * @param vec2 Second Vector2D Object
 * @param ctx CanvasRenderingContext2D onto which to draw the line
*/
function drawLine(vec1: Vector2D, vec2: Vector2D, ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(vec1.x, vec1.y);
    ctx.lineTo(vec2.x, vec2.y);
    ctx.stroke();
    ctx.closePath();
}

/** Draws a Branch Like Line from Parent to Child 
 * @param vec1 Main Vector point to draw from (Parent)
 * @param vec2 Second Vector point to draw to (Child)
 * @param spaceOffset The space above child vector for line to start curving in
 * @param ctx The main Canvas 2D Drawing Context
*/
function drawTreeBranch(vec1: Vector2D, vec2: Vector2D, spaceOffset: number, ctx: CanvasRenderingContext2D): void {
    // Line from Vec1 to Vec2 but with the Space Offset overhead
    let pos     = createVector(vec1.x, vec2.y - spaceOffset);
    drawLine(vec1, pos, ctx);
    
    // From the Space Offset point to right above Vec2
    // Then Down to Vec2's Position
    pos         = createVector(vec1.x, vec2.y - spaceOffset);
    let pos2    = createVector(vec2.x, vec2.y - spaceOffset);

    drawLine(pos, pos2, ctx);
    drawLine(pos2, vec2, ctx);
}