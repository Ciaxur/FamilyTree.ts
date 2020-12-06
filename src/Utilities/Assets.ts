// Module Imports
import { Assets } from './interfaces';
import { GARBAGE } from '../Core/Constants';


/** Initiates the Assets Returning an Asset Object */
export function initAssets(): Assets {
    // Assign Image Objects
    let core            = new Image();

    // Global Assets
    GARBAGE.close.src = "../../images/assets/garbage-closed.png";
    GARBAGE.open.src = "../../images/assets/garbage-opened.png";

    // Assign Source
    core.src = "../../images/SVG/member_container.svg";


    return {
        core: core
    };
}