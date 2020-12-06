/* 
 * Title: Vector Class
 * Can Create 2D Vectors using methods.
 * Calculations from two Vectors
 *  - Adding | Subtracting | Mutliplying | Dividing | Distance
 * Since Vector2D is an Object, a method is available to create a Deep Copy
*/

// Interface Imports
import { Size2D } from './interfaces';

/** Vector Class Object
 * A two Dimentional Vector Object with two Elements (x, y)
 * Calculations from two Vectors
 * Vector Methods for Manipulation
*/
export class Vector2D {
    public x: number;
    public y: number;
    
    /** Create a 2D Vector with Parameters
     * @constructor Create a 2D Vector
     * @param x Vector X Point (Optional)
     * @param y Vector Y Point (Optional)
     */
    constructor(x?, y?) {
        x ? this.x = x : this.x = undefined;    // Assign x if there is one
        y ? this.y = y : this.y = undefined;    // Assign y if there is one
    };

    /** Adds Vector2 to current vector */
    public add(vec2: Vector2D): void {
        this.x += vec2.x;
        this.y += vec2.y;
    }

    /** Subtracts Vector2 from current vector */
    public sub(vec2: Vector2D): void {
        this.x -= vec2.x;
        this.y -= vec2.y;
    }

    /** Multiplies Vector2 from current vector */
    public mult(vec2: Vector2D): void {
        this.x *= vec2.x;
        this.y *= vec2.y;
    }

    /** Divides Vector2 from current vector */
    public div(vec2: Vector2D): void {
        this.x /= vec2.x;
        this.y /= vec2.y;
    }

    /** Returns a Deep Copy of current Vector Object */
    public copy(): Vector2D {
        return new Vector2D(this.x, this.y);
    }
};


/** Creates and returns a 2D Vector Object 
 * @param x Vector X Point (Optional)
 * @param y Vector y Point (Optional)
*/
export function createVector(x?: number, y?: number){
    return new Vector2D(x, y);
}

/** Creates a Vector2D from the Center of parameter position.
 * Centralizes the given position
 * @param pos -Position Vector of Object
 * @param size -Size Vector of Object
*/
export function createCenterVector(pos: Vector2D, size: Size2D): Vector2D {
    return createVector(pos.x + (size.width / 2), pos.y + (size.height / 2));
}

/** Calculates the Distance between two 2D Vector Points
 * @param x1 -First x Vector Point
 * @param y1 -First y Vector Point
 * @param x2 -Second x Vector Point
 * @param y2 -Second y Vector Point
 */
export function dist(x1:number, y1:number, x2:number, y2:number): number {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

/** Calculates if Vector1 is within Vector2 from the Center of Vector
 * @param vec1 - Primary Vector (Location)
 * @param size1 - Primary Size (Offset)
 * @param vec2 - Secondary Vector (Location)
 * @param size2 - Secondary Size (Offset)
 * @returns A Boolean on the state of the two vectors overlaying
 */
export function within(vec1: Vector2D, size1: Size2D, vec2: Vector2D, size2: Size2D): Boolean {
    if ((vec1.x - size1.width / 2)  < (vec2.x + (size2.width / 2))  &&
        (vec1.x + size1.width / 2)  > (vec2.x - (size2.width / 2))  &&
        (vec1.y - size1.height / 2) < (vec2.y + (size2.height / 2)) &&
        (vec1.y + size1.height / 2) > (vec2.y - (size2.height / 2))) {
        return true;
    }

    return false;
}