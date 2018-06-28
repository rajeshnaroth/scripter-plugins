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

export { scaleNorth, scaleMid, scaleSouth, rootNote }