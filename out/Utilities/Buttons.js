"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vectors_1 = require("./Vectors");
const Constants_1 = require("../Core/Constants");
// Button Data
const addBtn = {
    offset: 10,
    radius: 15,
    pos: Vectors_1.createVector(0, 0),
    active: false
};
exports.addBtn = addBtn;
// Button Setup
addBtn.pos.x = Constants_1.WIDTH - (addBtn.radius + addBtn.offset);
addBtn.pos.y = Constants_1.HEIGHT - (addBtn.radius + addBtn.offset);

//# sourceMappingURL=Buttons.js.map
