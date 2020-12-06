// Module Imports
import { Button } from './interfaces';
import { createVector } from './Vectors';
import { WIDTH, HEIGHT } from '../Core/Constants';

// Button Data
const addBtn: Button = {
    offset: 10,
    radius: 15,
    pos: createVector(0, 0),
    active: false
};

// Button Setup
addBtn.pos.x = WIDTH - (addBtn.radius + addBtn.offset);
addBtn.pos.y = HEIGHT - (addBtn.radius + addBtn.offset);


// Module Exports
export {
    addBtn
};