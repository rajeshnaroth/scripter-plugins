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

function recalculate() {
	// Trace(selection.root);
}

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
	recalculate();
}

recalculate();

export { PluginParameters, ParameterChanged, getParameters }