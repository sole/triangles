function tesselate(pointA, pointB, subdivisionsX, subdivisionsY) {
// A(x1,y1) ---------------------+
// |                             |
// |                             |
// |                             |
// +--------------------- B(x2,y2)

	var vertices = [];
	
	subdivisionsX = subdivisionsX !== undefined ? subdivisionsX : 3;
	subdivisionsY = subdivisionsY !== undefined ? subdivisionsY : 3;

	// 1) generate the vertices in a 'grid' fashion
	var dx = pointB[0] - pointA[0];
	var dy = pointB[1] - pointA[1];
	var incX = dx / subdivisionsX;
	var incY = dy / subdivisionsY;

	console.log(dx, dy, incX, incY);

	var y = pointA[1];

	for(var j = 0; j < subdivisionsY; j++) {
		var row = [];
		var x = pointA[0];

		for(var i = 0; i < subdivisionsX; i++) {
			console.log(i, j, x, y);
			row.push([x, y]);
			x += incX;
		}
		
		vertices.push(row);
		y += incY;

	}

	return vertices;
}

module.exports = tesselate;
