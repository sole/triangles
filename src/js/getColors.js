var THREE = require('three');

var palette = [
	0xFF0000,
	0x00FF00,
	0x0000FF
];

function displaceHSL(v) {
	var color = new THREE.Color(v);
	var hsl = color.getHSL();
	var sign = Math.random() > 0.5 ? -1 : 1;
	var h = hsl.h;
	var variance = 0.5;
	var dh = Math.random() * 0.2 * sign;
 
	if(sign > 0) {
		h = Math.min(1.0, h + dh);
	} else {
		h = Math.max(0, h + dh);
	}

	hsl.h = h;
	hsl.s = 0.8;
	color.setHSL(hsl.h, hsl.s, hsl.l);
	return color.getHex();
}

function getColors() {
	var randomIndex = (Math.random() * palette.length) | 0;
	var base = palette[randomIndex];
	var colors = [ base ];

	colors.push( displaceHSL(base) );
	colors.push( displaceHSL(base) );
	
	return colors.map(function(v) {
		return new THREE.Color(v);
	});
}


module.exports = getColors;
