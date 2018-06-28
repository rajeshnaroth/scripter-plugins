import { PluginParameters, ParameterChanged, getParameters } from "./parameters"

function HandleMIDI(event) {
    var params = getParameters();
    event.send();
    // if it's a note 
    if (event instanceof NoteOn) { 
        var nNotes = params.numberOfNotes;
        var period = params.period;
        var sustain = params.sustain;
        var vvar = params.velocityVariation;
        var pvar = params.pitchVariation;
        
        while (nNotes > 0) {
            var delay = Math.random() * period;
            var velocity = event.velocity - vvar + Math.min(127, parseInt(Math.random() * vvar));
            var noteOn = new NoteOn;
            noteOn.pitch = event.pitch + parseInt(Math.random() * pvar - (pvar/2));
            noteOn.velocity = velocity;
            var noteOff = new NoteOff(noteOn);

            noteOn.sendAfterMilliseconds(delay);
            noteOff.sendAfterMilliseconds(delay + sustain);
            nNotes--;
        }
        
        // Trace(root, event.pitch);
        // Trace(event.pitch);
    }
    
}


// Need this so that Rollup will do its tree shake and include the code
// try catch block will get ignored in Logic 
try {
    consloe.log(PluginParameters, ParameterChanged, getParameters, HandleMIDI);
} catch (e) {}
