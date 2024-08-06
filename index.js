// cache pre-existing global values
var globals = [],
	globalValues = {};

globals.forEach(function (g) {
	if (g in global) globalValues[g] = global[g];
});

// restore pre-existing global values
globals.forEach(function (g) {
	if (g in globalValues) global[g] = globalValues[g];
	else delete global[g];
});
