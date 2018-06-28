'use strict';

const scaleNorth = [
	{ name: "RI GA __ __", offsets: [0, 0, -1, -2] },
	{ name: "RI __ GA __", offsets: [0, -1, 0, -1] },
	{ name: "RI __ __ GA", offsets: [0, -1, 1, 0] },
	{ name: "__ RI GA __", offsets: [1, 0, 0, -1] },
	{ name: "__ RI __ GA", offsets: [1, 0, 1, 0] },
	{ name: "__ __ RI GA", offsets: [2, 1, 0, 0] }
];

const scaleSouth = [
	{ name: "DA NI __ __", offsets: [0, 0, -1, -2] },
	{ name: "DA __ NI __", offsets: [0, -1, 0, -1] },
	{ name: "DA __ __ NI", offsets: [0, -1, 1, 0] },
	{ name: "__ DA NI __", offsets: [1, 0, 0, -1] },
	{ name: "__ DA __ NI", offsets: [1, 0, 1, 0] },
	{ name: "__ __ DA NI", offsets: [2, 1, 0, 0] }
];

const scaleMid = [
	{ name: "MA __", offsets: [0, -1] },
	{ name: "__ MA", offsets: [1, 0] }
];

const rootNote = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];


var selection = {
	root: 0,
	part1: 0,
	mid: 0,
	part2: 0,
	offsets: []
};

var PluginParameters = 
[
		{
			name:"Root Note" , 
			type:"menu",
			valueStrings: rootNote,
			minValue:0,
			maxValue:11,
			numberOfSteps: 12,
			defaultValue: selection.root,
			data: rootNote
		},
 
		{
			name:"Part 1" , 
			type:"menu",
			valueStrings: scaleNorth.map(s => s.name),
			minValue:0,
			maxValue:5,
			numberOfSteps: 6,
			defaultValue: selection.part1,
			data: scaleNorth
		},
 
		{
			name:"Mid",
			unit:"", type:"menu",
			valueStrings: scaleMid.map(s => s.name),
			minValue:0,
			maxValue:1,
			defaultValue: selection.mid,
			numberOfSteps:2,
			data: scaleMid
		},

		{
			name:"Part 2",
			unit:"",
			type:"menu",
			valueStrings: scaleSouth.map(s => s.name),
			minValue:0,
			maxValue:5, defaultValue:selection.part2,
			numberOfSteps:6,
			data: scaleSouth
		}

];

function recalculate() {
	Trace(selection.root);
	var part1 = PluginParameters[1].data[selection.part1].offsets;
	var mid = PluginParameters[2].data[selection.mid].offsets;
	var part2 = PluginParameters[3].data[selection.part2].offsets;
	selection.offsets = [0].concat(part1, mid, [0], part2);
}

function getScale() {
	return selection;
}

function ParameterChanged(param, value) {
	Trace(param + ", " + value); // print the value to the console
	switch(param) {
		case 0:
			selection.root = value;
			break;
		case 1:
			selection.part1 = value;
			break;
		case 2:
			selection.mid = value;
			break;
		case 3:
			selection.part2 = value;
			break;
	}
	recalculate();
}

recalculate();

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
