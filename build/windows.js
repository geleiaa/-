module.exports = {
	input: "./main.js",
	name: "ransom",
	output: "./dist/ransom.exe",
	target: "win32-x64-11.12.0", //win32-x86-11.12.0
	build: true,
	bundle: true,
	make: ["j4"], 
};