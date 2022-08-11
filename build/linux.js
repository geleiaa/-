module.exports = {
	input: "./main.js",
	name: "ransom.sh",
	output: "./dist/ransom.sh",
	target: "linux-x64-11.12.0",
	build: true,
	bundle: true,
	make: ["j4"]
};