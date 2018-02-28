---
layout: post
title: Quick D3 Voronoi Example
date:   2018-02-28 01:58:45 +0300
categories: js react d3 canvas voronoi
image: voronoi_d3.jpg
---

Today I saw a tweet from @levelsio where he asked how to draw areas on his HoodMaps project as vector curves instead of blocks. Here is my version.

I propose to use Voronoi algorithm from [D3js](https://d3js.org/).

The idea is to feed it a list of centers of thore square blocks and it will draw polygons, then you can smooth or blur those polygons. Whatever will work better.

Here is quick and rough demo:

<canvas width="500" height="500"></canvas>
<script src="https://d3js.org/d3.v4.min.js"></script>

<script>
	const canvas = d3.select("canvas").node();
	const context = canvas.getContext("2d");
	const width = canvas.width;
	const height = canvas.height;
	
	var points = d3.range(100)
	    .map(function(d) { return [Math.random() * width, Math.random() * height]; });
	
	var voronoi = d3.voronoi()
	    .extent([[-1, -1], [width + 1, height + 1]]);
	
	draw();
	
	function draw() {
	  const diagram = voronoi(points);
	  const polygons = diagram.polygons();
	
		const colors = ['#F3E0A0', '#E09E9B', '#C0E9B8'];
	
	  context.clearRect(0, 0, width, height);
	
		polygons.map((polygon, i) => {
			drawCell(polygons[i], colors[i%colors.length]);
		})
	}
	
	function drawCell(cell, color) {
	  if (!cell) return false;
	  context.beginPath();
	  context.moveTo(cell[0][0], cell[0][1]);
	  for (var j = 1, m = cell.length; j < m; ++j) {
	    context.lineTo(cell[j][0], cell[j][1]);
	  }
	  context.closePath();
	  context.fillStyle = color;
	  context.fill();
	  return true;
	}
</script>

And here is the code itself:

```js
const canvas = d3.select("canvas").node();
const context = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

var points = d3.range(100)
    .map(function(d) { return [Math.random() * width, Math.random() * height]; });

var voronoi = d3.voronoi()
    .extent([[-1, -1], [width + 1, height + 1]]);

draw();

function draw() {
  const diagram = voronoi(points);
  const polygons = diagram.polygons();

	const colors = ['#F3E0A0', '#E09E9B', '#C0E9B8'];

  context.clearRect(0, 0, width, height);

	polygons.map((polygon, i) => {
		drawCell(polygons[i], colors[i%colors.length]);
	})
}

function drawCell(cell, color) {
  if (!cell) return false;
  context.beginPath();
  context.moveTo(cell[0][0], cell[0][1]);
  for (var j = 1, m = cell.length; j < m; ++j) {
    context.lineTo(cell[j][0], cell[j][1]);
  }
  context.closePath();
  context.fillStyle = color;
  context.fill();
  return true;
}
```

As I said it's possible to apply smoothing or blurring on top of it.
