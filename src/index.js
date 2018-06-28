import { PluginParameters, ParameterChanged, getScale } from "./parameters"

function HandleMIDI(event) {
    Trace(getScale().offsets);
    Trace(getScale().root);
    var offsets = getScale().offsets;
    var root = getScale().root;
    // if it's a note 
    if (event instanceof Note) { 
        var pitch = event.pitch;
        offsets.forEach((offset, i) => {
            event.pitch = pitch + offset - root; 
            event.sendAfterMilliseconds(i * 300); // send after delay
        });
    }
}

// Dont copy the following two lines
console.log(
    PluginParameters,
    ParameterChanged
);
HandleMIDI(null);