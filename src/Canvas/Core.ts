// Module Imports
import { WIDTH, HEIGHT } from '../Core/Constants';


// HTML5 Cavnas Variables
const canvas: any = document.getElementById("canvas");
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

// Canvas Setup
ctx.imageSmoothingEnabled = true;
ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;


// Export Modules
export {
    canvas,
    ctx
}