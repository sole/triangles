var THREE = require('three');

var palette = [
	0x82eb5d,
	0x8bea38,
	0x8d33e3,
	0xf3ce49,
	0x6bbfdb,
	0x1a307b,
	0xda1d21,
	0xb14ee9
];

function displaceHSL(v) {
	var color = new THREE.Color(v);
	var hsl = color.getHSL();
	var sign = Math.random() > 0.5 ? -1 : 1;
	var h = hsl.h;
	var variance = 0.2;
	var dh = Math.random() * variance * sign;
 
	if(sign > 0) {
		h = Math.min(1.0, h + dh);
	} else {
		h = Math.max(0, h + dh);
	}

	hsl.h = h;
	//hsl.s -= 0.2;
	//hsl.l -= 0.2;
	color.setHSL(hsl.h, hsl.s, hsl.l);
	return color.getHex();
}

var lastIndex = 0;
function getNextIndex() {
	lastIndex++;
	//return ((0.5 + 0.5 * Math.sin(lastIndex * 0.5)) * palette.length) | 0;
	return ( ( Math.random() * palette.length ) | 0);
}

function getColors() {
	var randomIndex = getNextIndex();
	var base = palette[randomIndex];
	var colors = [ base ];

	colors.push( displaceHSL(base) );
	colors.push( displaceHSL(base) );
	
	return colors.map(function(v) {
		return new THREE.Color(v);
	});
}


module.exports = getColors;
