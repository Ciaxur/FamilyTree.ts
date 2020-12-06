// // Module Imports
import { nodeTree } from '../Core/Preload';
import { showAddButton } from '../Canvas/Canvas-Draw';
import { cleanup } from '../Events/Mouse';
import { handleLinkers } from '../TreeNodes/Linkers';
import { drawDebugDetails, debugMode } from '../Debug/debug';


/** 
 * Main Canvas Drawing 
 * @param fn Function passed through to run additional draws (Optional)
 */
export function main(fn?: Function){
    // Run the Nodes
    nodeTree.run();

    // 'Main.ts' Function Draw
    fn();

    // Display the Add Button
    showAddButton();

    // Variable Cleanup
    cleanup();

    // Handle Member Linkers (Properties)
    handleLinkers(nodeTree.activeMember());


    // DEBUG AREA
    if(debugMode)
        drawDebugDetails();
}

