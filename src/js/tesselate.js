var seedrandom = require('seedrandom');

function makeTriangle(a, b, c) {
	return [ a[2], b[2], c[2] ];
}

function tesselate(pointA, pointB, subdivisionsX, subdivisionsY, randomX, randomY, seed) {
// A(x1,y1) ---------------------+
// |                             |
// |                             |
// |                             |
// +--------------------- B(x2,y2)

	var vertices = [];
	var rawVertices = [];
	var i, j, row;
	
	subdivisionsX = subdivisionsX !== undefined ? subdivisionsX : 3;
	subdivisionsY = subdivisionsY !== undefined ? subdivisionsY : 3;
	randomX = randomX !== undefined ? randomX : 0.5;
	randomY = randomY !== undefined ? randomY : 0.5;
	seed = seed !== undefined ? seed : Date.now();
	
	var rand = makeRandomiser(seed);

	// 1) generate the vertices in a 'grid' fashion
	var dx = pointB[0] - pointA[0];
	var dy = pointB[1] - pointA[1];
	var incX = dx / subdivisionsX;
	var incY = dy / subdivisionsY;
	var randX = incX * randomX;
	var randY = incY * randomY;

	var y = pointA[1];

	for(j = 0; j < subdivisionsY; j++) {
		row = [];
		var x = pointA[0];

		for(i = 0; i < subdivisionsX; i++) {
			var vertex = [x + rand(randX), y + rand(randY), rawVertices.length];
			rawVertices.push(vertex);
			row.push(vertex);
			x += incX;
		}
		
		vertices.push(row);
		y += incY;

	}

	var faces = [];
	var toTheRight = false;
	// 2) generate the triangles from top to bottom, left to right
	for(j = 0; j < subdivisionsY - 1; j++) {
		
		row = vertices[j];
		var nextRow = vertices[j + 1];

		toTheRight = (j % 2 === 0);

		for(i = 0; i < subdivisionsX - 1; i++) {
			var a = row[i];
			var b = row[i + 1];
			var c = nextRow[i + 1];
			var d = nextRow[i];

			// AB
			// DC
			// / = abd, bcd
			// \ = abc, cda

			if(toTheRight) {
				faces.push(makeTriangle(a, b, d));
				faces.push(makeTriangle(b, c, d));
			} else {
				faces.push(makeTriangle(a, b, c));
				faces.push(makeTriangle(c, d, a));
			}
			
			toTheRight = !toTheRight;
		}
	}

	return {
		vertices: vertices,
		faces: faces
	};
}


function makeRandomiser(seed) {
	var gen = seedrandom(seed);

	function rand(v) {
		return (gen() * 0.5 - 1) * v;
	}

	return rand;
}



module.exports = tesselate;
