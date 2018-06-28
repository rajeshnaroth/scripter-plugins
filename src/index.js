import { PluginParameters, ParameterChanged, getScale } from "./parameters"

function HandleMIDI(event) {
    var offsets = getScale().offsets;
    var root = getScale().root;

    // if it's a note 
    if (event instanceof Note) { 
        var pitch = event.pitch;
        var noteNum = (pitch % 12 - root + 12) % 12;
        event.pitch = pitch + offsets[noteNum];
        // Trace(root, event.pitch);
        // Trace(event.pitch);
        event.send();
    }
}


// Need this so that Rollup will do its tree shake and include the code
// try catch block will get ignored in Logic 
try {
    consloe.log(PluginParameters, ParameterChanged, HandleMIDI);
} catch (e) {}
