'use strict';

// import  { scaleNorth, scaleMid, scaleSouth, rootNote } from "./definitions"

var selection = {
	numberOfNotes: 10,
	sustain: 200, //milliseconds
	period: 2000, //milliseconds
	velocityVariation: 20,
	pitchVariation: 0
};

var PluginParameters = 
[
	{
		name:"Number of Notes" , 
		type:"lin",
		unit:"",
		minValue:10,
		maxValue:100,
		numberOfSteps: 9,
		defaultValue: selection.numberOfNotes
	},

	{
		name:"Note Length" , 
		type:"lin",
		unit:"millisec",
		minValue:200,
		maxValue:2000,
		numberOfSteps: 100,
		defaultValue: selection.sustain
	},

	{
		name:"Period" , 
		type:"lin",
		unit:"millisec",
		minValue:100,
		maxValue:4000,
		numberOfSteps: 39,
		defaultValue: selection.period
	},

	{
		name:"Velocity variation" , 
		type:"lin",
		minValue:0,
		maxValue:40,
		numberOfSteps: 10,
		defaultValue: selection.velocityVariation
	},

	{
		name:"Pitch variation" , 
		type:"lin",
		minValue:0,
		maxValue:100,
		numberOfSteps: 10,
		defaultValue: selection.pitchVariation
	},
];

function getParameters() {
	return selection;
}

function ParameterChanged(param, value) {
	// Trace(param + ", " + value); // print the value to the console
	switch(param) {
		case 0:
			selection.numberOfNotes = value;
			break;
		case 1:
			selection.sustain = value;
			break;
		case 2:
			selection.period = value;
			break;
		case 3:
			selection.velocityVariation = value;
			break;
		case 4:
			selection.pitchVariation = value;
			break;
	}
}

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
