module.exports = {
	input: "./main.js",
	name: "ransom.sh",
	output: "./dist/ransom-mac.sh",
	target: "macos-x64-11.12.0",
	build: true,
	bundle: true,
	make: ["j4"]
};