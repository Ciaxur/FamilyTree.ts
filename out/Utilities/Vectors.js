"use strict";
/*
 * Title: Vector Class
 * Can Create 2D Vectors using methods.
 * Calculations from two Vectors
 *  - Adding | Subtracting | Mutliplying | Dividing | Distance
 * Since Vector2D is an Object, a method is available to create a Deep Copy
*/
Object.defineProperty(exports, "__esModule", { value: true });
/** Vector Class Object
 * A two Dimentional Vector Object with two Elements (x, y)
 * Calculations from two Vectors
 * Vector Methods for Manipulation
*/
class Vector2D {
    /** Create a 2D Vector with Parameters
     * @constructor Create a 2D Vector
     * @param x Vector X Point (Optional)
     * @param y Vector Y Point (Optional)
     */
    constructor(x, y) {
        x ? this.x = x : this.x = undefined; // Assign x if there is one
        y ? this.y = y : this.y = undefined; // Assign y if there is one
    }
    ;
    /** Adds Vector2 to current vector */
    add(vec2) {
        this.x += vec2.x;
        this.y += vec2.y;
    }
    /** Subtracts Vector2 from current vector */
    sub(vec2) {
        this.x -= vec2.x;
        this.y -= vec2.y;
    }
    /** Multiplies Vector2 from current vector */
    mult(vec2) {
        this.x *= vec2.x;
        this.y *= vec2.y;
    }
    /** Divides Vector2 from current vector */
    div(vec2) {
        this.x /= vec2.x;
        this.y /= vec2.y;
    }
    /** Returns a Deep Copy of current Vector Object */
    copy() {
        return new Vector2D(this.x, this.y);
    }
}
exports.Vector2D = Vector2D;
;
/** Creates and returns a 2D Vector Object
 * @param x Vector X Point (Optional)
 * @param y Vector y Point (Optional)
*/
function createVector(x, y) {
    return new Vector2D(x, y);
}
exports.createVector = createVector;
/** Creates a Vector2D from the Center of parameter position.
 * Centralizes the given position
 * @param pos -Position Vector of Object
 * @param size -Size Vector of Object
*/
function createCenterVector(pos, size) {
    return createVector(pos.x + (size.width / 2), pos.y + (size.height / 2));
}
exports.createCenterVector = createCenterVector;
/** Calculates the Distance between two 2D Vector Points
 * @param x1 -First x Vector Point
 * @param y1 -First y Vector Point
 * @param x2 -Second x Vector Point
 * @param y2 -Second y Vector Point
 */
function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}
exports.dist = dist;
/** Calculates if Vector1 is within Vector2 from the Center of Vector
 * @param vec1 - Primary Vector (Location)
 * @param size1 - Primary Size (Offset)
 * @param vec2 - Secondary Vector (Location)
 * @param size2 - Secondary Size (Offset)
 * @returns A Boolean on the state of the two vectors overlaying
 */
function within(vec1, size1, vec2, size2) {
    if ((vec1.x - size1.width / 2) < (vec2.x + (size2.width / 2)) &&
        (vec1.x + size1.width / 2) > (vec2.x - (size2.width / 2)) &&
        (vec1.y - size1.height / 2) < (vec2.y + (size2.height / 2)) &&
        (vec1.y + size1.height / 2) > (vec2.y - (size2.height / 2))) {
        return true;
    }
    return false;
}
exports.within = within;

//# sourceMappingURL=Vectors.js.map
