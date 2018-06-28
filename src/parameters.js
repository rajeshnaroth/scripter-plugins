const scaleNorth = [
	{ name: "RI GA __ __", offsets: [1, 2] },
	{ name: "RI __ GA __", offsets: [1, 3] },
	{ name: "RI __ __ GA", offsets: [1, 4] },
	{ name: "__ RI GA __", offsets: [2, 3] },
	{ name: "__ RI __ GA", offsets: [2, 4] },
	{ name: "__ __ RI GA", offsets: [3, 4] }
];

const scaleSouth = [
	{ name: "DA NI __ __", offsets: [8, 9] },
	{ name: "DA __ NI __", offsets: [8, 10] },
	{ name: "DA __ __ NI", offsets: [8, 11] },
	{ name: "__ DA NI __", offsets: [9, 10] },
	{ name: "__ DA __ NI", offsets: [9, 11] },
	{ name: "__ __ DA NI", offsets: [10, 11] }
];

const scaleMid = [
	{ name: "MA __", offsets: [5] },
	{ name: "__ MA", offsets: [6] }
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
	selection.offsets = [0].concat(part1, mid, [7], part2, [12]);
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

export { PluginParameters, ParameterChanged, getScale }