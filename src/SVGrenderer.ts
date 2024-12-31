
const svg_content: Element[] = [];
var svg: SVGSVGElement;
var g: SVGGElement;

function SVG_draw(type: any) {
  const e: Element = document.createElementNS("http://www.w3.org/2000/svg", type);
  svg_content.push(e);
  return g.appendChild(e);
}
function SVG_clear() {
  svg_content.forEach((e)=>g.removeChild(e));
  svg_content.length = 0
}


var cell_height: number, cell_width: number;

export function initSVG() {
  SVG_clear();
  const cell_rect = cells[0][0].getBoundingClientRect();
  cell_height = cell_rect.height;
  cell_width  = cell_rect.width;
  svg.setAttribute('height', (cell_height * tectonic.height)+"px");
  svg.setAttribute('width' , (cell_width  * tectonic.width )+"px");
  svg.style.position = "absolute";
  svg.style.top = cell_rect.top;
  svg.style.left = cell_rect.left;
  svg.style.pointerEvents = "none";
}

function drawArrow(i: number,j: number, ti: number, tj: number, c: number) {
  const path = SVG_draw("path");
  path.setAttribute('d', `M${(j+0.5)*cell_width},${(i+0.5)*cell_height} L${(tj+0.5)*cell_width},${(ti+0.5)*cell_height}`);
  path.setAttribute('style', `stroke: ${c === 1 ? 'red' : 'green'}; stroke-width: 1.25px; fill: none; marker-end: url(#arrow);`);
  return path;
}

export function createSVG() {
    svg = document.body.appendChild( document.createElementNS("http://www.w3.org/2000/svg", "svg") );
    g = svg.appendChild( document.createElementNS("http://www.w3.org/2000/svg", "g") );
    const defs = g.appendChild( document.createElementNS("http://www.w3.org/2000/svg", "defs") );
    const marker = defs.appendChild( document.createElementNS("http://www.w3.org/2000/svg", "marker") );
    marker.setAttribute('id', 'arrow');
    marker.setAttribute('viewBox', '0 0 10 10');
    marker.setAttribute('markerWidth', '6');
    marker.setAttribute('markerHeight', '6');
    marker.setAttribute('refx', '5');
    marker.setAttribute('refy', '5');
    marker.setAttribute('orient', 'auto-start-reverse');
    const path = marker.appendChild( document.createElementNS("http://www.w3.org/2000/svg", "path") );
    path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
    path.setAttribute('style', "fill:red;");
}
