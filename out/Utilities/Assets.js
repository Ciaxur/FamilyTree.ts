"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Core/Constants");
/** Initiates the Assets Returning an Asset Object */
function initAssets() {
    // Assign Image Objects
    let core = new Image();
    // Global Assets
    Constants_1.GARBAGE.close.src = "../../images/assets/garbage-closed.png";
    Constants_1.GARBAGE.open.src = "../../images/assets/garbage-opened.png";
    // Assign Source
    core.src = "../../images/SVG/member_container.svg";
    return {
        core: core
    };
}
exports.initAssets = initAssets;

//# sourceMappingURL=Assets.js.map
