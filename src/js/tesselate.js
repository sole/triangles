function makeTriangle(a, b, c) {
	return [ a[2], b[2], c[2] ];
}

function tesselate(pointA, pointB, subdivisionsX, subdivisionsY) {
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

	// 1) generate the vertices in a 'grid' fashion
	var dx = pointB[0] - pointA[0];
	var dy = pointB[1] - pointA[1];
	var incX = dx / subdivisionsX;
	var incY = dy / subdivisionsY;

	console.log(dx, dy, incX, incY);

	var y = pointA[1];

	for(j = 0; j < subdivisionsY; j++) {
		row = [];
		var x = pointA[0];

		for(i = 0; i < subdivisionsX; i++) {
			// console.log(i, j, x, y);
			var vertex = [x, y, rawVertices.length];
			rawVertices.push(vertex);
			row.push(vertex);
			x += incX;
		}
		
		vertices.push(row);
		y += incY;

	}

	var faces = [];
	// 2) generate the triangles from top to bottom, left to right
	for(j = 0; j < subdivisionsY - 1; j++) {
		
		row = vertices[j];
		var nextRow = vertices[j + 1];

		for(i = 0; i < subdivisionsX - 1; i++) {
			var a = row[i];
			var b = row[i + 1];
			var c = nextRow[i + 1];
			var d = nextRow[i];

			// AB
			// DC
			// / = abd, bcd
			// \ = abc, cda

			faces.push(makeTriangle(a, b, d));
			faces.push(makeTriangle(b, c, d));
		}
	}

	return {
		vertices: vertices,
		faces: faces
	};
}

module.exports = tesselate;
