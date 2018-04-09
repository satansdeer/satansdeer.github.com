---
title: Quick D3 Voronoi Example
date: 2018-02-28T15:58:45.284Z
categories: js react d3 canvas voronoi
image: voronoi_d3.jpg
---

Today I saw a tweet from [@levelsio](https://twitter.com/levelsio/status/968759873268797440) where he asked how to draw areas on his HoodMaps project as vector curves instead of blocks. Here is my version.

Here is the question itself:

![Twitter question](/pieter_question.png)

I propose to use Voronoi algorithm from [D3js](https://d3js.org/).

D3js has a function `voronoi` that takes list of points (which will be centers of polygons) and then builds voronoi diagram by them.

My idea is to feed it a list of centers of those square blocks and it will draw polygons, then you can smooth or blur the polygons. Whatever will work better, or even both.

Here is quick and rough demo:

<canvas style="width: 100%; border-radius: 4px; cursor: pointer" width="1920" height="1080"></canvas>
<script src="https://d3js.org/d3.v4.min.js"></script>

<script>
  const COLORS = ['#F3E0A0', '#E09E9B', '#C0E9B8', '#8D9CB5'];

  const canvas = d3.select('canvas').node();
  const context = canvas.getContext('2d');
  const { width, height } = canvas;

  const points = d3.range(100)
      .map(d => [Math.random() * width, Math.random() * height]);

  const voronoi = d3.voronoi()
      .extent([[-1, -1], [width + 1, height + 1]]);

  const drawCell = (cell, color) => {
    if (!cell) return false;
    context.beginPath();
    context.moveTo(cell[0][0], cell[0][1]);
    cell.forEach((point) => {
      context.lineTo(point[0], point[1]);
    })
    context.closePath();
    context.fillStyle = color;
    context.fill();
    return true;
  }

  const draw = () => {
    const diagram = voronoi(points);
    const polygons = diagram.polygons();

    context.clearRect(0, 0, width, height);

    polygons.forEach((polygon, i) => {
      drawCell(polygon, COLORS[i%COLORS.length]);
    })
  }

  draw();
</script>

And here is the code itself:

```js
const COLORS = ['#F3E0A0', '#E09E9B', '#C0E9B8', '#8D9CB5'];

const canvas = d3.select("canvas").node();
const context = canvas.getContext("2d");
const { width, height } = canvas;

const points = d3.range(100)
    .map(d => [Math.random() * width, Math.random() * height]);

const voronoi = d3.voronoi()
    .extent([[-1, -1], [width + 1, height + 1]]);

const drawCell = (cell, color) => {
  if (!cell) return false;
  context.beginPath();
  context.moveTo(cell[0][0], cell[0][1]);
  cell.forEach((point) => {
    context.lineTo(point[0], point[1]);
  })
  context.closePath();
  context.fillStyle = color;
  context.fill();
  return true;
}

const draw = () => {
  const diagram = voronoi(points);
  const polygons = diagram.polygons();

  context.clearRect(0, 0, width, height);

  polygons.forEach((polygon, i) => {
    drawCell(polygon, COLORS[i%COLORS.length]);
  })
}

draw();
```

Also I import D3 here like this:

```html
<script src="https://d3js.org/d3.v4.min.js"></script>
```

As I said it's possible to apply smoothing or blurring on top of it.
