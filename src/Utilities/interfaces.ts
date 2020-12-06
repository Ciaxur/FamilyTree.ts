import { NodeMember } from '../TreeNodes/Node';
import { Vector2D } from './Vectors';

/** Button Properites Interface 
 * X,Y Position
 * Position Offsets
 * Size as Radius
 * Active State
*/
export interface Button {
    pos: Vector2D,
    radius: number,
    offset: number,
    active: Boolean
};

/** A two Dimentional Vector Object for Sizing with two Elements (width, height) */ 
export interface Size2D {
    width: number,
    height: number
};

/** Node Relation with another Node and Data */ 
export interface NodeRelation {
    attatchAtDist: number,  // Distance to validate attatchment
    children: NodeMember[], // Attatched Children Nodes
    parents: NodeMember[],  // Parent Nodes
    isParent: Boolean,      // State of Parent
    partners: NodeMember[], // Partners of Node
    highlightNodes: Boolean // State of Node Relation Highlights
};

/** Node Linker Data 
 * x        -> X Location
 * y        -> Y Location
 * radius   -> Linker's Radius
 * type     -> "partner" , "child"
*/
export interface Linker {
    pos: Vector2D,
    radius: number,
    type: string,
    fill: string,
    opacity: number,
    stroke: string
};

/** Active Node Interface
 * Data for the Active node
 * member -> NodeMember Reference currently Active
 * index -> Index location in array for the member
 * linker -> Current active Linker
 * startingPos -> mouse's starting position to calculate the change in mouse position
 *      in order to move the node by it.
*/
export interface ActiveNode {
    member: NodeMember,
    index: number,
    linker: Linker,
    startingPos: Vector2D
};

/** Assets Interface (Image HTML Elements)
 * Requires the Image Assets of all Nodes
 * core -> Core Member Image
 * contextMenu -> Menu Image
*/
export interface Assets {
    core: HTMLImageElement
};