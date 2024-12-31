
export function get(id: string): HTMLElement { return document.getElementById(id)!;}

export function mk(tagName: string, classes: string[] = [], innerText: string|null = null) {
  const res = document.createElement(tagName);
  res.classList.add(...classes);
  if (innerText) {
    res.innerText = innerText;
  }
  return res;
}

export function wipe(node: HTMLElement): HTMLElement {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
  return node;
}

export function arr<E>(length: number, fill:((_: number) => E)|null = null) : E[] {
  const res = new Array(length);
  if (fill) {
    for (let i = 0; i < length; i++) {
      res[i] = fill(i);
    }
  }
  return res;
}

export function arr2<E>(height: number, width: number, fill:((i:number, j: number) => E)|null = null) : E[][] {
  if (fill) {
    return arr(height, (i) => arr(width, (j)=>fill(i,j)));
  } else {
    return arr(height, (_) => arr(width));
  }
}
