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

// Dont copy the following two lines
console.log(
    PluginParameters,
    ParameterChanged
);
HandleMIDI(null);